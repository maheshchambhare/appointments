import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

const JWTKEY = process.env.JWT_KEY_TOKEN;
const JWTKEYOTP = process.env.JWT_KEY_OTP;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const otp = body.otp;

    const cookie = req.cookies.get("userauth");
    if (cookie) {
      const userToken = cookie?.value;

      const userTokenDecrypted = await jwt.verify(userToken, JWTKEYOTP);

      const businessUser = userTokenDecrypted.businessUser;

      if (userTokenDecrypted.otp == otp) {
        const prismaRes = await prisma.businessUser.create({
          data: { ...businessUser, verified: true },
        });

        let jsonToken = "";

        try {
          jsonToken = await jwt.sign(prismaRes, JWTKEY, {
            expiresIn: 31556926, // 1 year in seconds
          });
        } catch (error) {
          console.error("Error generating token:", error);
        }

        const response = NextResponse.json(
          {
            name: prismaRes.name,
            slug: prismaRes.slug,
            about: prismaRes.about,
            address: prismaRes.address,
            id: prismaRes.id,
          },
          { status: 200 }
        );
        response.cookies.set("token", jsonToken, {
          httpOnly: true,
          secure: true,
          sameSite: true,
        });

        response.cookies.delete("userauth");
        return response;
      }

      const response = NextResponse.json(
        { message: "Otp is invalid" },
        { status: 400 }
      );
      return response;
    }
    return NextResponse.json(
      { message: "Something failed, user not found" },
      { status: 500 }
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
