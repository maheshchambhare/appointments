import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const slug = body?.slug;

    const businessUser = await prisma.businessUser.findUnique({
      where: {
        slug: slug,
        AND: [{ verified: true }, { approved: true }],
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (businessUser) {
      let jsonToken = "";

      try {
        jsonToken = await jwt.sign(businessUser, JWTKEY, {
          expiresIn: 31556926, // 1 year in seconds
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }

      const response = NextResponse.json(
        { data: businessUser },
        { status: 200 }
      );

      return response;
    }

    const response = NextResponse.json(
      { message: "user not found" },
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

export { POST };
