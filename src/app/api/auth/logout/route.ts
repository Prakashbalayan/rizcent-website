import { NextResponse } from "next/server";
import { logoutUser } from "@/lib/user-auth";

export async function POST() {
  try {
    await logoutUser();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("USER_LOGOUT_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}