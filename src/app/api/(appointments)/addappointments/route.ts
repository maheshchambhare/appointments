import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import sendOtp from "../../(auth)/sendOtp";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const JWTKEYOTP: any = process.env.JWT_KEY_OTP;
const FAST2SMSAUTH: any = process.env.FAST2SMSAUTH;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const cookie = req.cookies.get("appointify");

    const businessUserCookie: any = cookie?.value;

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

      return NextResponse.json(
        { message: "Appointment added" },
        { status: 200 }
      );
    } else {
      const verificationCode = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(6, "0");

      // console.log(verificationCode, "ABCD");

      // sendOtp({ verificationCode, mobileNumber: body.mobile });

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

      let jsonToken = "";
      try {
        jsonToken = await jwt.sign(
          { appointmentData: appointmentData, otp: verificationCode },
          JWTKEYOTP,
          {
            expiresIn: 31556926, // 1 year in seconds
          }
        );
      } catch (error) {
        console.error("Error generating token:", error);
      }
      const response = NextResponse.json(
        { message: "Success" },
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
