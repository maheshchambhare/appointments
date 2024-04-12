import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtp from "../sendOtp";

const saltRounds = 10;
const JWTKEY: any = process.env.JWT_KEY_OTP;

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    //    Encrypt Password
    const password = body.password;
    const encryptedPass = await bcrypt
      .hash(password, saltRounds)
      .then((hash: String) => {
        return hash;
      });

    const verificationCode = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");

    const slugCode = generateRandomString(10);

    const slug = body.businessName.replace(/\s+/g, "-") + "-" + slugCode;

    const updatedUser = {
      ...body,
      password: encryptedPass,
      slug: slug.toLowerCase(),
    };

    let jsonToken = "";

    try {
      jsonToken = await jwt.sign(
        { otp: verificationCode, businessUser: updatedUser },
        JWTKEY,
        {
          expiresIn: 31556926, // 1 year in seconds
        }
      );
    } catch (error) {
      console.error("Error generating token:", error);
    }

    try {
      sendOtp({ verificationCode, mobileNumber: body.mobile });
    } catch (e) {
      const response = NextResponse.json(
        { message: "send otp failed" },
        { status: 400 }
      );
      return response;
    }

    const response = NextResponse.json({ user: updatedUser }, { status: 200 });

    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

    response.cookies.set("userauth", jsonToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: sixMonthsFromNow,
    });

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
