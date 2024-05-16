import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const tokenJWT = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);
      const packageVal = {
        ...body,
        businessUserId: businessVal.id,
      };

      const addPackage = await prisma.services.create({
        data: packageVal,
      });

      const response = NextResponse.json(
        { message: "Package added successfully", data: addPackage },
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

export { POST };
