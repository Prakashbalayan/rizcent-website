import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

async function isAdmin(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  return verifyAdminToken(token);
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
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

    const { id } = await params;

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
    console.error("SERVICE_GET_ERROR:", error);

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
  { params }: RouteContext
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

    const { id } = await params;
    const body = await request.json();

    const slug = String(body.slug ?? "").trim().toLowerCase();
    const title = String(body.title ?? "").trim();
    const shortDescription = String(
      body.shortDescription ?? ""
    ).trim();
    const description = String(body.description ?? "").trim();
    const category = String(body.category ?? "").trim();
    const features = String(body.features ?? "").trim();
    const process = String(body.process ?? "").trim();
    const featured = Boolean(body.featured);
    const published =
      body.published === undefined ? true : Boolean(body.published);

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

    const currentService = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!currentService) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found.",
        },
        { status: 404 }
      );
    }

    const duplicate = await prisma.service.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "Another service already uses this slug.",
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
  { params }: RouteContext
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

    const { id } = await params;

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