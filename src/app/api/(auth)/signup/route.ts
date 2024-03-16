import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWTKEY = process.env.JWT_KEY_OTP;

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    //    Encrypt Password
    const password = body.password;
    const encryptedPass = await bcrypt
      .hash(password, saltRounds)
      .then((hash: String, err: any) => {
        return hash;
      });

    const verificationCode = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(6, "0");

    const updatedUser = { ...body, password: encryptedPass };

    const prismaRes = await prisma.businessUser.create({ data: updatedUser });

    let jsonToken = "";

    try {
      jsonToken = await jwt.sign(
        { otp: verificationCode, id: prismaRes.id },
        JWTKEY,
        {
          expiresIn: 31556926, // 1 year in seconds
        }
      );
    } catch (error) {
      console.error("Error generating token:", error);
    }

    const response = NextResponse.json({ res: updatedUser }, { status: 200 });

    response.cookies.set("userauth", jsonToken, {
      httpOnly: true,
      secure: false,
      sameSite: false,
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
