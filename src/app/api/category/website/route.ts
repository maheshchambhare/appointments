import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const businessUserId = body.businessUserId;

    const categoryList = await prisma.category.findMany({
      where: {
        businessUserId,
      },
    });

    const response = NextResponse.json(
      {
        categories: categoryList,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { POST };
