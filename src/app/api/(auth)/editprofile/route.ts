import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const BUSINESSUSER: any = process.env.USERBUSINESS;
const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const tokenJWT: any = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      const editBusiness = await prisma.businessUser.update({
        where: {
          id: businessVal.id,
        },
        data: body,
      });

      const response = NextResponse.json(
        { message: "Profile updated successful" },
        { status: 200 }
      );
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      response.cookies.set("businessUser", JSON.stringify({ ...body }), {
        httpOnly: false,
        secure: false,
        sameSite: false,
        expires: sixMonthsFromNow,
      });

      return response;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { POST };
