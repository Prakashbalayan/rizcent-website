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

    // Check contact messages first
    const contact = await prisma.contactMessage.findUnique({
      where: {
        id,
      },
    });

    if (contact) {
      await prisma.contactMessage.delete({
        where: {
          id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Contact enquiry deleted successfully.",
      });
    }

    // Check quote requests
    const quote = await prisma.quoteRequest.findUnique({
      where: {
        id,
      },
    });

    if (quote) {
      await prisma.quoteRequest.delete({
        where: {
          id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Quote request deleted successfully.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Enquiry not found.",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("LEAD_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete enquiry.",
      },
      { status: 500 }
    );
  }
}