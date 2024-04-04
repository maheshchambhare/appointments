import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const GET = async (req: NextRequest) => {
  try {
    const tokenJWT = req.cookies.get("admin");
    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      const superadmin = await prisma.superAdmin.findMany({
        where: {
          id: businessVal.id,
        },
      });

      if (superadmin) {
        const businessUser = await prisma.businessUser.findMany();
        const response = NextResponse.json(
          { users: businessUser },
          { status: 200 }
        );
        return response;
      } else {
        const response = NextResponse.json(
          { message: "user not found" },
          { status: 404 }
        );
        return response;
      }
    }

    const response = NextResponse.json(
      { message: "user not found" },
      { status: 404 }
    );
    return response;
  } catch (error) {
    console.log(error, "ERRR");
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { GET };
