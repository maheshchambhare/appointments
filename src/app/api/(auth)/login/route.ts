import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWTKEYOTP = process.env.JWT_KEY_OTP;
const JWTKEY = process.env.JWT_KEY_TOKEN;

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    //    Encrypt Password
    const password = body.password;
    const mobile = body.mobile;

    const businessUser = await prisma.businessUser.findUnique({
      where: {
        mobile: mobile,
      },
    });

    // check password

    const checkPass = await bcrypt
      .compare(password, businessUser?.password)
      .then((result: boolean, err: any) => {
        return result == true;
      });

    if (checkPass) {
      let jsonToken = "";

      try {
        jsonToken = await jwt.sign(businessUser, JWTKEY, {
          expiresIn: 31556926, // 1 year in seconds
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }

      console.log(jsonToken, "PPPP");

      const response = NextResponse.json(
        { res: businessUser },
        { status: 200 }
      );

      response.cookies.set("token", jsonToken, {
        httpOnly: true,
        secure: false,
        sameSite: false,
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
