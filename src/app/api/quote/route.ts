import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const projectName = String(body.projectName ?? "").trim();
    const projectType = String(body.projectType ?? "").trim();
    const timeline = String(body.timeline ?? "").trim();
    const description = String(body.description ?? "").trim();
    const services = Array.isArray(body.services)
      ? body.services.map(String).join(", ")
      : String(body.services ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const name = String(body.name ?? "").trim();
    const company = String(body.company ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (
      !projectName ||
      !projectType ||
      !timeline ||
      !description ||
      !services ||
      !budget ||
      !name ||
      !email
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        projectName,
        projectType,
        timeline,
        description,
        services,
        budget,
        name,
        company: company || null,
        email,
        phone: phone || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your project enquiry has been submitted successfully.",
        id: quote.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("QUOTE_API_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}