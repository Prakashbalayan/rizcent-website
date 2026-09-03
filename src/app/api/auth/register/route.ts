import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { hashPassword, createUserSession } from "@/lib/user-auth";
import { validatePassword } from "@/lib/password-policy";
import { checkRateLimit } from "@/lib/rate-limit";

const REGISTER_LIMIT = 5;
const REGISTER_WINDOW_MS = 15 * 60 * 1000;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    /*
     * Limit account creation attempts by IP address.
     *
     * This prevents automated scripts from creating
     * large numbers of accounts using different emails.
     */
    const rateLimit = await checkRateLimit({
      key: `register:${clientIp}`,
      limit: REGISTER_LIMIT,
      windowMs: REGISTER_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many registration attempts. Please try again later.",
          retryAfterSeconds:
            rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After":
              String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, email, and password are required.",
        },
        { status: 400 },
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name must be 100 characters or fewer.",
        },
        { status: 400 },
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const passwordValidation =
      validatePassword(password);

    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password does not meet the security requirements.",
          errors: passwordValidation.errors,
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An account with this email already exists.",
        },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    await createUserSession(user.id);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "USER_REGISTER_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}