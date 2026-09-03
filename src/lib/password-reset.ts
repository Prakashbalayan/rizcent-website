import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

const RESET_TOKEN_DURATION_MS = 60 * 60 * 1000;

function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createPasswordResetToken(userId: string) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashResetToken(rawToken);

  const expiresAt = new Date(
    Date.now() + RESET_TOKEN_DURATION_MS,
  );

  // Remove any previous reset tokens for this user.
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });

  const resetToken = await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return {
    token: rawToken,
    tokenId: resetToken.id,
    expiresAt: resetToken.expiresAt,
  };
}

export async function getPasswordResetToken(token: string) {
  if (!token) {
    return null;
  }

  const tokenHash = hashResetToken(token);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!resetToken) {
    return null;
  }

  if (resetToken.usedAt) {
    return null;
  }

  if (resetToken.expiresAt <= new Date()) {
    await prisma.passwordResetToken.deleteMany({
      where: {
        id: resetToken.id,
      },
    });

    return null;
  }

  return resetToken;
}

export async function consumePasswordResetToken(token: string) {
  if (!token) {
    return null;
  }

  const tokenHash = hashResetToken(token);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
  });

  if (!resetToken) {
    return null;
  }

  if (resetToken.usedAt) {
    return null;
  }

  if (resetToken.expiresAt <= new Date()) {
    await prisma.passwordResetToken.deleteMany({
      where: {
        id: resetToken.id,
      },
    });

    return null;
  }

  const consumedToken =
    await prisma.passwordResetToken.updateMany({
      where: {
        id: resetToken.id,
        tokenHash,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      data: {
        usedAt: new Date(),
      },
    });

  if (consumedToken.count !== 1) {
    return null;
  }

  return resetToken;
}

export async function cleanupExpiredPasswordResetTokens() {
  await prisma.passwordResetToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}