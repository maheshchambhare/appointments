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
        data: {
          about: body.about,
          address: body.address,
          weekdays: body.weekdays,
          startTime: body.duration.startTime,
          endTime: body.duration.endTime,
          breakTimeStart: body.duration.breakTimeStart,
          breakTimeEnd: body.duration.breakTimeEnd,
        },
      });

      const response = NextResponse.json(
        { message: "Profile updated successful" },
        { status: 200 }
      );
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      response.cookies.set(
        "businessUser",
        JSON.stringify({
          name: editBusiness.name,
          slug: editBusiness.slug,
          about: editBusiness.about,
          businessName: editBusiness.businessName,
          address: editBusiness.address,
          mobile: editBusiness.mobile,
          userType: 0,
        }),
        {
          httpOnly: false,
          secure: false,
          sameSite: false,
          expires: sixMonthsFromNow,
        }
      );

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
