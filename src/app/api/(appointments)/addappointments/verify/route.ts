import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const JWTKEYOTP: any = process.env.JWT_KEY_OTP;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const otp = body.otp;

    const cookie = req.cookies.get("appointmentauth");
    if (cookie) {
      const otpEncrypted = cookie?.value;

      const decryptedOtp: any = await jwt.verify(otpEncrypted, JWTKEYOTP);

      console.log(decryptedOtp?.otp, otp, "OTPS");

      if (decryptedOtp?.otp == otp) {
        const user = {
          name: decryptedOtp.appointmentData.name,
          mobile: JSON.stringify(decryptedOtp.appointmentData.mobile),
          sex: decryptedOtp.appointmentData.sex,
          verified: true,
        };

        let jsonToken = "";

        const createUser = await prisma.user.create({
          data: user,
        });

        const appointmentData = {
          userId: createUser.id,
          businessUserId: decryptedOtp.appointmentData.businessUserId,
          slot: decryptedOtp.appointmentData.slot,
          date: decryptedOtp.appointmentData.date,
          memberId: decryptedOtp.appointmentData.memberId,
          status: "0",
        };

        const appointments = await prisma.appointments.create({
          data: appointmentData,
        });

        console.log(createUser, appointmentData, appointments, "USER DATA");

        const response = NextResponse.json(
          { message: "Successfully veified" },
          { status: 200 }
        );
        response.cookies.set("appointmentform", jsonToken, {
          httpOnly: true,
          secure: true,
          sameSite: true,
        });

        response.cookies.delete("appointmentauth");
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
