import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPasswordResetToken } from "@/lib/password-reset";
import { hashPassword } from "@/lib/user-auth";
import { validatePassword } from "@/lib/password-policy";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const token = String(body.token ?? "");
    const password = String(body.password ?? "");

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token and password are required.",
        },
        { status: 400 },
      );
    }

    const resetToken = await getPasswordResetToken(token);

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link is invalid or has expired.",
        },
        { status: 400 },
      );
    }

    const passwordValidation = validatePassword(password);

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

    const passwordHash = await hashPassword(password);

    /*
     * Update the password and consume the reset token
     * inside one database transaction.
     */
    const result = await prisma.$transaction(async (tx) => {
      /*
       * Re-check the token inside the transaction.
       *
       * This protects against two requests trying to use
       * the same reset token at the same time.
       */
      const currentToken =
        await tx.passwordResetToken.findUnique({
          where: {
            id: resetToken.id,
          },
        });

      if (!currentToken) {
        throw new Error("RESET_TOKEN_INVALID");
      }

      if (currentToken.usedAt) {
        throw new Error("RESET_TOKEN_USED");
      }

      if (currentToken.expiresAt <= new Date()) {
        throw new Error("RESET_TOKEN_EXPIRED");
      }

      /*
       * Mark the token as used.
       */
      const consumed =
        await tx.passwordResetToken.updateMany({
          where: {
            id: currentToken.id,
            usedAt: null,
            expiresAt: {
              gt: new Date(),
            },
          },
          data: {
            usedAt: new Date(),
          },
        });

      if (consumed.count !== 1) {
        throw new Error("RESET_TOKEN_ALREADY_CONSUMED");
      }

      /*
       * Update the customer's password.
       */
      const user = await tx.user.update({
        where: {
          id: currentToken.userId,
        },
        data: {
          passwordHash,
        },
      });

      /*
       * Revoke every existing customer session.
       *
       * The customer must sign in again using the new
       * password.
       */
      await tx.session.deleteMany({
        where: {
          userId: currentToken.userId,
        },
      });

      /*
       * Delete all other reset tokens for this user.
       */
      await tx.passwordResetToken.deleteMany({
        where: {
          userId: currentToken.userId,
          id: {
            not: currentToken.id,
          },
        },
      });

      return user;
    });

    return NextResponse.json({
      success: true,
      message:
        "Your password has been reset successfully. Please sign in with your new password.",
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "RESET_TOKEN_INVALID"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link is invalid.",
        },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "RESET_TOKEN_USED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link has already been used.",
        },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "RESET_TOKEN_EXPIRED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link has expired. Please request a new one.",
        },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "RESET_TOKEN_ALREADY_CONSUMED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link has already been used.",
        },
        { status: 400 },
      );
    }

    console.error("RESET_PASSWORD_API_ERROR:", error);

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