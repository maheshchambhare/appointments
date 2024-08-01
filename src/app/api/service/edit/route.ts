import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const tokenJWT = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);
      const serviceVal = {
        ...body,
        businessUserId: businessVal.id,
      };

      const service = await prisma.service.update({
        where: {
          id: serviceVal.id,
        },
        data: serviceVal,
      });

      const response = NextResponse.json(
        { message: "service added successfully", service },
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

export { PUT };
