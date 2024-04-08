import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWTKEY: any = process.env.JWT_KEY_OTP;

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    //    Encrypt Password
    const password = body.password;
    const mobile = body.mobile;
    const encryptedPass = await bcrypt
      .hash(password, saltRounds)
      .then((hash: String) => {
        return hash;
      });

    const verificationCode = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");

    const businessUser = await prisma.businessUser.findUnique({
      where: {
        mobile: mobile,
      },
    });

    const updatedUser = {
      id: businessUser?.id,
      password: encryptedPass,
      otp: verificationCode,
    };

    if (businessUser) {
      let jsonToken = "";

      try {
        jsonToken = await jwt.sign(updatedUser, JWTKEY, {
          expiresIn: 31556926, // 1 year in seconds
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }

      const response = NextResponse.json(
        { message: "otp send successfully" },
        { status: 200 }
      );

      response.cookies.set("userauth", jsonToken, {
        httpOnly: true,
        secure: false,
        sameSite: false,
      });

      return response;
    }

    return NextResponse.json(
      { message: "Mobile number could not be found" },
      { status: 404 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { POST };
