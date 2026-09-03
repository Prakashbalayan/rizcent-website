import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createPasswordResetToken } from "@/lib/password-reset";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

const FORGOT_PASSWORD_LIMIT = 3;
const FORGOT_PASSWORD_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your email address.",
        },
        { status: 400 },
      );
    }

    /*
     * Limit password-reset requests for each email address.
     *
     * This is especially important because this endpoint
     * sends real emails through Resend.
     */
    const rateLimit = await checkRateLimit({
      key: `forgot-password:${email}`,
      limit: FORGOT_PASSWORD_LIMIT,
      windowMs: FORGOT_PASSWORD_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many password reset requests. Please try again later.",
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
     * Always return the same response whether the
     * email exists or not.
     *
     * This prevents email/account enumeration.
     */
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists with that email, you will receive a password reset link shortly.",
      });
    }

    /*
     * Create a secure password reset token.
     *
     * Only the hashed token is stored in the database.
     */
    const resetToken = await createPasswordResetToken(
      user.id,
    );

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const resetUrl =
      `${appUrl}/reset-password?token=${encodeURIComponent(
        resetToken.token,
      )}`;

    /*
     * Send the reset email through Resend.
     *
     * The reset token is never returned to the browser.
     */
    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    });

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with that email, you will receive a password reset link shortly.",
    });
  } catch (error) {
    console.error(
      "FORGOT_PASSWORD_API_ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't process your request right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}