import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getCurrentUser,
  hashPassword,
  verifyPassword,
  createUserSession,
} from "@/lib/user-auth";
import { validatePassword } from "@/lib/password-policy";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to change your password.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const currentPassword = String(
      body.currentPassword ?? "",
    );

    const newPassword = String(body.newPassword ?? "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Current password and new password are required.",
        },
        { status: 400 },
      );
    }

    const currentPasswordValid = await verifyPassword(
      currentPassword,
      user.passwordHash,
    );

    if (!currentPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Your current password is incorrect.",
        },
        { status: 400 },
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your new password must be different from your current password.",
        },
        { status: 400 },
      );
    }

    const passwordValidation =
      validatePassword(newPassword);

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

    const newPasswordHash =
      await hashPassword(newPassword);

    /*
     * Save the new password and revoke all existing
     * sessions in one transaction.
     */
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordHash: newPasswordHash,
        },
      }),

      prisma.session.deleteMany({
        where: {
          userId: user.id,
        },
      }),
    ]);

    /*
     * Create a fresh session for the current device.
     *
     * This keeps the customer logged in after changing
     * their password while all previous sessions are revoked.
     */
    await createUserSession(user.id);

    return NextResponse.json({
      success: true,
      message:
        "Your password has been changed successfully.",
    });
  } catch (error) {
    console.error("CHANGE_PASSWORD_API_ERROR:", error);

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