import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWTKEY = process.env.JWT_KEY_TOKEN;

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const password = body.password;
    const name = body.name;

    const businessUser = await prisma.superAdmin.findUnique({
      where: {
        name: name,
      },
    });

    console.log(businessUser, "POPOPPPPP");

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

      const response = NextResponse.json(
        {
          message: "success",
        },
        { status: 200 }
      );

      response.cookies.set("admin", jsonToken, {
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
