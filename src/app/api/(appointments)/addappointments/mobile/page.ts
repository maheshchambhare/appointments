import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWTKEYOTP = process.env.JWT_KEY_OTP;

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    //    Encrypt Password

    const mobile = body.mobile;

    const user = await prisma.user.findUnique({
      where: {
        mobile: mobile,
      },
    });

    if (user) {
      const response = NextResponse.json({ user }, { status: 200 });

      return response;
    } else {
      const verificationCode = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(6, "0");

      let jsonToken = "";

      try {
        jsonToken = await jwt.sign({ otp: verificationCode }, JWTKEYOTP, {
          expiresIn: 31556926, // 1 year in seconds
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }
      const response = NextResponse.json(
        { message: "Success" },
        { status: 200 }
      );
      response.cookies.set("userauth", jsonToken, {
        httpOnly: true,
        secure: false,
        sameSite: false,
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
