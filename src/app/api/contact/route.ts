import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get the currently logged-in customer.
    // Guest visitors can still submit contact messages.
    const user = await getCurrentUser();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,

        // Associate the message with the logged-in customer.
        // Guest messages remain supported.
        userId: user?.id ?? null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been submitted successfully.",
        id: contact.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT_API_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}