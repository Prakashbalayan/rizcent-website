import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function isAdmin(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  console.log("Admin token exists:", Boolean(token));

  if (!token) {
    return false;
  }

  return verifyAdminToken(token);
}

function cleanString(value: unknown) {
  return String(value ?? "").trim();
}

function cleanOptionalString(value: unknown) {
  const cleaned = cleanString(value);
  return cleaned || null;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;

    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("SERVICE_GET_BY_ID_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load service.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;
    const body = await request.json();

    const slug = cleanString(body.slug).toLowerCase();
    const title = cleanString(body.title);
    const shortDescription = cleanString(body.shortDescription);
    const description = cleanString(body.description);
    const category = cleanString(body.category);
    const features = cleanString(body.features);
    const process = cleanString(body.process);
    const imageUrl = cleanOptionalString(body.imageUrl);

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

    const existingService = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!existingService) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    const duplicateSlug = await prisma.service.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "A service with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const service = await prisma.service.update({
      where: {
        id,
      },
      data: {
        slug,
        title,
        shortDescription,
        description,
        category,
        features,
        process,
        imageUrl,
        featured,
        published,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (error) {
    console.error("SERVICE_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update service.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;

    const existingService = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!existingService) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("SERVICE_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete service.",
      },
      { status: 500 }
    );
  }
}