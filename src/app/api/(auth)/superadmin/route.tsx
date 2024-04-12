import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendOtp from "../sendOtp";

const saltRounds = 10;
const JWTKEY: any = process.env.JWT_KEY_OTP;

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

    const updatedUser = {
      ...body,
      password: encryptedPass,
    };

    const superadmin = await prisma.superAdmin.create({ data: updatedUser });

    let jsonToken = "";

    try {
      jsonToken = await jwt.sign({ superadmin }, JWTKEY, {
        expiresIn: 31556926, // 1 year in seconds
      });
    } catch (error) {
      console.error("Error generating token:", error);
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
