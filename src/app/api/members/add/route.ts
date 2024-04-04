import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    //    Encrypt Password
    const password = body.password;
    const encryptedPass = await bcrypt
      .hash(password, saltRounds)
      .then((hash: string) => {
        return hash;
      });

    const tokenJWT = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);
      const updatedUser = {
        ...body,
        password: encryptedPass,
        businessUserId: businessVal.id,
      };

      const addmember = await prisma.member.create({
        data: updatedUser,
      });

      const response = NextResponse.json(
        { message: "Member added successfully", data: addmember },
        { status: 200 }
      );

      return response;
    }
    const response = NextResponse.json(
      { message: "Business user not found" },
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
