import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

function parseArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map(String)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  } catch {
    // Fall back to comma-separated values.
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
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

function hasRequiredFields(body: Record<string, unknown>) {
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

/* GET ONE BLOG POST */
export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog post not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("BLOG_GET_ONE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load blog post.",
      },
      {
        status: 500,
      }
    );
  }
}

/* UPDATE BLOG POST */
export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!hasRequiredFields(body)) {
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

    const slug = String(body.slug)
      .trim()
      .toLowerCase();

    const existingPost = await prisma.blogPost.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog post not found.",
        },
        {
          status: 404,
        }
      );
    }

    const slugOwner = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
    });

    if (slugOwner && slugOwner.id !== id) {
      return NextResponse.json(
        {
          success: false,
          message: "Another blog post already uses this slug.",
        },
        {
          status: 409,
        }
      );
    }

    const post = await prisma.blogPost.update({
      where: {
        id,
      },
      data: {
        slug,
        title: String(body.title).trim(),
        excerpt: String(body.excerpt).trim(),
        category: String(body.category).trim(),
        author: String(body.author).trim(),
        date: String(body.date).trim(),
        readTime: String(body.readTime).trim(),
        featured: Boolean(body.featured),
        tags: JSON.stringify(
          parseArray(
            typeof body.tags === "string"
              ? body.tags
              : JSON.stringify(body.tags ?? [])
          )
        ),
        content: normalizeContent(body.content),
        published:
          typeof body.published === "boolean"
            ? body.published
            : existingPost.published,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully.",
      post,
    });
  } catch (error) {
    console.error("BLOG_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update blog post.",
      },
      {
        status: 500,
      }
    );
  }
}

/* DELETE BLOG POST */
export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const existingPost = await prisma.blogPost.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog post not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.blogPost.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    console.error("BLOG_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete blog post.",
      },
      {
        status: 500,
      }
    );
  }
}