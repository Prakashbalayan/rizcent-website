import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function parseArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed
          .map(String)
          .map((item) => item.trim())
          .filter(Boolean);
      }
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function normalizeContent(value: unknown): string {
  if (typeof value === "string") {
    try {
      JSON.parse(value);
      return value;
    } catch {
      return JSON.stringify([
        {
          paragraphs: [value],
        },
      ]);
    }
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  return JSON.stringify([]);
}

function validateRequired(body: Record<string, unknown>) {
  const required = [
    "slug",
    "title",
    "excerpt",
    "category",
    "author",
    "date",
    "readTime",
  ];

  return required.every(
    (field) =>
      typeof body[field] === "string" &&
      body[field].trim().length > 0
  );
}

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
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
      posts,
    });
  } catch (error) {
    console.error("BLOG_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load blog posts.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!validateRequired(body)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const slug = String(body.slug).trim().toLowerCase();

    const existing = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog post with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title: String(body.title).trim(),
        excerpt: String(body.excerpt).trim(),
        category: String(body.category).trim(),
        author: String(body.author).trim(),
        date: String(body.date).trim(),
        readTime: String(body.readTime).trim(),
        featured: Boolean(body.featured),
        tags: JSON.stringify(parseArray(body.tags)),
        content: normalizeContent(body.content),
        published:
          typeof body.published === "boolean"
            ? body.published
            : true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully.",
        post,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("BLOG_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create blog post.",
      },
      {
        status: 500,
      }
    );
  }
}