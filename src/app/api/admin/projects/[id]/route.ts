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

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("PROJECT_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load project.",
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
    const category = String(body.category ?? "").trim();
    const shortDescription = String(
      body.shortDescription ?? ""
    ).trim();
    const description = String(body.description ?? "").trim();
    const technologies = String(body.technologies ?? "").trim();
    const services = String(body.services ?? "").trim();
    const year = String(body.year ?? "").trim();
    const clientType = String(body.clientType ?? "").trim();
    const challenge = String(body.challenge ?? "").trim();
    const solution = String(body.solution ?? "").trim();
    const results = String(body.results ?? "").trim();
    const featured = Boolean(body.featured);

    if (
      !slug ||
      !title ||
      !category ||
      !shortDescription ||
      !description ||
      !technologies ||
      !services ||
      !year ||
      !clientType ||
      !challenge ||
      !solution ||
      !results
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const currentProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!currentProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    const duplicate = await prisma.project.findFirst({
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
          message: "Another project already uses this slug.",
        },
        { status: 409 }
      );
    }

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        slug,
        title,
        category,
        shortDescription,
        description,
        technologies,
        services,
        year,
        clientType,
        featured,
        challenge,
        solution,
        results,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    console.error("PROJECT_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update project.",
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

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("PROJECT_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete project.",
      },
      { status: 500 }
    );
  }
}