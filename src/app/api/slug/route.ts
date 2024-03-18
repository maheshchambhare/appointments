import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const slug = body?.slug;
    console.log(slug, "ttt");
    const businessUser = await prisma.businessUser.findUnique({
      where: {
        slug: slug,
        AND: [{ verified: true }, { approved: true }],
      },
    });

    const response = NextResponse.json({ data: businessUser }, { status: 200 });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { POST };
