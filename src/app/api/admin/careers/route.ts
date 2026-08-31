import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth";

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

    const jobs = await prisma.job.findMany({
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
      jobs,
    });
  } catch (error) {
    console.error("CAREERS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load jobs.",
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
      body.published === undefined ? true : Boolean(body.published);

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

    const existing = await prisma.job.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A job with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const job = await prisma.job.create({
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

    return NextResponse.json(
      {
        success: true,
        message: "Job created successfully.",
        job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CAREER_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create job.",
      },
      { status: 500 }
    );
  }
}