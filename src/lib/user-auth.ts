import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const USER_COOKIE_NAME = "user_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

function getSecretKey() {
  const secret = process.env.USER_AUTH_SECRET;

  if (!secret) {
    throw new Error("USER_AUTH_SECRET is not defined");
  }

  return new TextEncoder().encode(secret);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
) {
  return bcrypt.compare(password, passwordHash);
}

export async function createUserSession(userId: string) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_SECONDS * 1000,
  );

  const session = await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  const signedToken = await new SignJWT({
    sid: session.id,
    uid: userId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();

  cookieStore.set(USER_COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });

  return session;
}

async function getSessionIdFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    if (
      typeof payload.sid !== "string" ||
      typeof payload.uid !== "string"
    ) {
      return null;
    }

    return {
      sessionId: payload.sid,
      userId: payload.uid,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const sessionData = await getSessionIdFromCookie();

  if (!sessionData) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionData.sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.userId !== sessionData.userId) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await prisma.session.deleteMany({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session.user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}

export async function logoutUser() {
  const sessionData = await getSessionIdFromCookie();

  if (sessionData) {
    await prisma.session.deleteMany({
      where: {
        id: sessionData.sessionId,
      },
    });
  }

  const cookieStore = await cookies();

  cookieStore.set(USER_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function cleanupExpiredSessions() {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

export { USER_COOKIE_NAME };