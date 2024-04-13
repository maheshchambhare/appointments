import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const password = body.password;
    const name = body.name;

    const businessUser: any = await prisma.superAdmin.findUnique({
      where: {
        name: name,
      },
    });

    const checkPass = await bcrypt
      .compare(password, businessUser?.password)
      .then((result: boolean) => {
        return result == true;
      });

    if (checkPass) {
      let jsonToken = "";

      const businessUser: any = await prisma.superAdmin.update({
        where: {
          name: name,
        },
        data: {
          fcmToken: body.fcmToken,
        },
      });

      try {
        jsonToken = await jwt.sign(businessUser, JWTKEY, {
          expiresIn: 31556926, // 1 year in seconds
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }

      const response = NextResponse.json(
        {
          message: "success",
        },
        { status: 200 }
      );

      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

      response.cookies.set("admin", jsonToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: sixMonthsFromNow,
      });

      return response;
    }

    const response = NextResponse.json(
      { message: "Login password is not valid" },
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
