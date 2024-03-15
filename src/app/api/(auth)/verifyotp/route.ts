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
      const otpEncrypted = cookie?.value;

      const decryptedOtp = await jwt.verify(otpEncrypted, JWTKEYOTP);

      if (decryptedOtp.otp == otp) {
        const businessUser = await prisma.businessUser.update({
          where: {
            id: decryptedOtp.id,
          },
          data: {
            verified: decryptedOtp.otp == otp,
          },
        });

        let jsonToken = "";

        try {
          jsonToken = await jwt.sign(businessUser, JWTKEY, {
            expiresIn: 31556926, // 1 year in seconds
          });
        } catch (error) {
          console.error("Error generating token:", error);
        }

        const response = NextResponse.json(
          { message: "Successfully veified" },
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
