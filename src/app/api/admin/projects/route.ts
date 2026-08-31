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

export async function GET(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const projects = await prisma.project.findMany({
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
    projects,
  });
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

    const existing = await prisma.project.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A project with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
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

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("PROJECT_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create project.",
      },
      { status: 500 }
    );
  }
}