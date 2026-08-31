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

function parseArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
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

    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("CAREER_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load job.",
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

    const currentJob = await prisma.job.findUnique({
      where: {
        id,
      },
    });

    if (!currentJob) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    const slug = String(body.slug ?? "")
      .trim()
      .toLowerCase();

    const title = String(body.title ?? "").trim();
    const department = String(body.department ?? "").trim();
    const location = String(body.location ?? "").trim();
    const type = String(body.type ?? "").trim();
    const experience = String(body.experience ?? "").trim();
    const description = String(body.description ?? "").trim();

    const responsibilities = parseArray(body.responsibilities);
    const requirements = parseArray(body.requirements);
    const niceToHave = parseArray(body.niceToHave);

    const featured = Boolean(body.featured);
    const published =
      body.published === undefined
        ? currentJob.published
        : Boolean(body.published);

    if (
      !slug ||
      !title ||
      !department ||
      !location ||
      !type ||
      !experience ||
      !description ||
      responsibilities.length === 0 ||
      requirements.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const duplicate = await prisma.job.findFirst({
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
          message: "Another job already uses this slug.",
        },
        { status: 409 }
      );
    }

    const job = await prisma.job.update({
      where: {
        id,
      },
      data: {
        slug,
        title,
        department,
        location,
        type,
        experience,
        description,
        responsibilities: JSON.stringify(responsibilities),
        requirements: JSON.stringify(requirements),
        niceToHave: JSON.stringify(niceToHave),
        featured,
        published,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("CAREER_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update job.",
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

    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    await prisma.job.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("CAREER_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete job.",
      },
      { status: 500 }
    );
  }
}