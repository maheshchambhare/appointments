import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const tokenJWT = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      const businessUser = await prisma.businessUser.update({
        where: {
          id: businessVal.id,
        },
        data: {
          slots: body.slots,
          weekdays: body.weekDays,
        },
      });

      const response = NextResponse.json(
        { message: "Successfully generated slots" },
        { status: 200 }
      );
      return response;
    }

    const response = NextResponse.json(
      { message: "something went wrong" },
      { status: 400 }
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
