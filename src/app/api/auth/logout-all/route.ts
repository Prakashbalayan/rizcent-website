import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createUserSession,
  getCurrentUser,
} from "@/lib/user-auth";

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        { status: 401 },
      );
    }

    /*
     * Remove every active session belonging to this user.
     */
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    /*
     * Create a fresh session for the current device.
     *
     * This means the customer stays logged in here while
     * every other device/session is signed out.
     */
    await createUserSession(user.id);

    return NextResponse.json({
      success: true,
      message:
        "All other devices have been signed out successfully.",
    });
  } catch (error) {
    console.error("LOGOUT_ALL_API_ERROR:", error);

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