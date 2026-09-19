import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

async function isAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  return verifyAdminToken(token);
}

export async function GET(request: NextRequest) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const services = await prisma.service.findMany({
      orderBy: [
        {
          featured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("SERVICE_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load services.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const slug = String(body.slug ?? "")
      .trim()
      .toLowerCase();

    const title = String(body.title ?? "").trim();

    const shortDescription = String(
      body.shortDescription ?? ""
    ).trim();

    const description = String(body.description ?? "").trim();

    const category = String(body.category ?? "").trim();

    const features = String(body.features ?? "").trim();

    const process = String(body.process ?? "").trim();

    const imageUrl = String(body.imageUrl ?? "").trim();

    const featured = Boolean(body.featured);

    const published =
      body.published === undefined
        ? true
        : Boolean(body.published);

    if (
      !slug ||
      !title ||
      !shortDescription ||
      !description ||
      !category ||
      !features ||
      !process
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.service.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A service with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const service = await prisma.service.create({
      data: {
        slug,
        title,
        shortDescription,
        description,
        category,
        features,
        process,
        imageUrl: imageUrl || null,
        featured,
        published,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully.",
        service,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SERVICE_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create service.",
      },
      { status: 500 }
    );
  }
}