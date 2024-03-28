import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const JWTKEYOTP: any = process.env.JWT_KEY_OTP;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const cookie = req.cookies.get("token");

    const businessUserCookie = cookie?.value;
    const businessUSER: any = await jwt.verify(businessUserCookie, JWTKEY);
    const user = await prisma.user.findUnique({
      where: {
        mobile: JSON.stringify(body.mobile),
      },
    });

    if (user) {
      const appointmentData = {
        userId: user.id,
        businessUserId: businessUSER.id,
        slot: body.slot,
        date: body.date,
        status: "0",
        memberId: body.memberId,
      };

      const addAppointment = await prisma.appointments.create({
        data: appointmentData,
      });

      console.log(addAppointment, "JJJJ");

      return NextResponse.json(
        { message: "Appointment added" },
        { status: 200 }
      );
    } else {
      const verificationCode = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(6, "0");

      let jsonToken = "";

      const appointmentData = {
        businessUserId: businessUSER.id,
        slot: body.slot,
        date: body.date,
        status: "0",
        name: body.name,
        mobile: body.mobile,
        sex: body.sex,
        memberId: body.memberId,
      };

      try {
        jsonToken = await jwt.sign(
          { otp: verificationCode, appointmentData: appointmentData },
          JWTKEYOTP,
          {
            expiresIn: 31556926, // 1 year in seconds
          }
        );
      } catch (error) {
        console.error("Error generating token:", error);
      }
      const response = NextResponse.json(
        { message: "Success", otp: verificationCode },
        { status: 201 }
      );
      response.cookies.set("appointmentauth", jsonToken, {
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
