import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const businessUserId = body.businessUserId;
    const categoryId = body.categoryId;

    let services = [];

    if (categoryId) {
      services = await prisma.service.findMany({
        where: {
          businessUserId,
          categoryId,
        },
      });
    } else {
      services = await prisma.service.findMany({
        where: {
          businessUserId,
        },
      });
    }

    const response = NextResponse.json(
      {
        services: services,
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
