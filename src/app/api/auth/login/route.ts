import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  createUserSession,
  verifyPassword,
} from "@/lib/user-auth";
import { checkRateLimit } from "@/lib/rate-limit";

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 },
      );
    }

    /*
     * Rate-limit by email address.
     *
     * This protects an individual account from repeated
     * password-guessing attempts.
     */
    const rateLimit = await checkRateLimit({
      key: `login:${email}`,
      limit: LOGIN_LIMIT,
      windowMs: LOGIN_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many login attempts. Please try again later.",
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

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    /*
     * Keep the same response for unknown accounts
     * and incorrect passwords.
     */
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const passwordValid = await verifyPassword(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    /*
     * Successful authentication.
     *
     * Clear the failed-attempt counter for this email
     * so the user gets a fresh window.
     */
    await prisma.rateLimit.deleteMany({
      where: {
        key: `login:${email}`,
      },
    });

    await createUserSession(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("USER_LOGIN_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}