import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const GET = async (req: NextRequest) => {
  try {
    const tokenJWT = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      const categoryList = await prisma.category.findMany({
        where: {
          businessUserId: businessVal.id,
        },
      });

      const response = NextResponse.json(
        {
          categories: categoryList,
        },
        { status: 200 }
      );

      return response;
    }
    const response = NextResponse.json(
      { message: "Business user not found" },
      { status: 400 }
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

export { GET };
