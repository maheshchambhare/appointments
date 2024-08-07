import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const slugs = await prisma.website.findMany({
      select: {
        slug: true,
      },
    });

    const response = NextResponse.json(
      { message: "all slugs", slugs },
      { status: 404 }
    );
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { GET };
