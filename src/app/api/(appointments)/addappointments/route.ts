import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import adminApp from "@/app/components/utils/firebase/firebaseServer";
import sendOtp from "../../(auth)/sendOtp";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const JWTKEYOTP: any = process.env.JWT_KEY_OTP;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const cookie = req.cookies.get("appointify");

    const businessUserCookie: any = cookie?.value;

    const businessUSER: any = await jwt.verify(businessUserCookie, JWTKEY);

    const tokens =
      businessUSER.fcmToken == body.fcmToken
        ? [businessUSER.fcmToken]
        : businessUSER.fcmToken && body.fcmToken
        ? [businessUSER.fcmToken, body.fcmToken]
        : [businessUSER.fcmToken];

    // Send the notification

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
        serviceId: body.serviceId,
      };

      const addAppointment = await prisma.appointments.create({
        data: appointmentData,
      });

      const message: any = {
        data: {
          appointment: JSON.stringify(addAppointment),
          customer: user.name,
          message: "Appointment added successfully",
        },
        tokens: tokens,
      };

      adminApp
        .messaging()
        .sendMulticast(message)
        .then((response) => {
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });

      return NextResponse.json(
        {
          message: "Appointment added",
          data: { ...addAppointment, name: user.name },
        },
        { status: 202 }
      );
    } else {
      const verificationCode = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(6, "0");

      try {
        sendOtp({ verificationCode, mobileNumber: body.mobile });
      } catch (e) {
        const response = NextResponse.json(
          { message: "send otp failed" },
          { status: 400 }
        );
        return response;
      }

      const appointmentData = {
        businessUserId: businessUSER.id,
        slot: body.slot,
        date: body.date,
        status: "0",
        name: body.name,
        mobile: body.mobile,
        sex: body.sex,
        memberId: body.memberId,
        serviceId: body.serviceId,
      };

      let jsonToken = "";
      try {
        jsonToken = await jwt.sign(
          {
            appointmentData: appointmentData,
            otp: verificationCode,
            businessFcm: businessUSER.fcmToken,
            memberFcm: body.fcmToken,
          },
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

      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      response.cookies.set("appointmentauth", jsonToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: sixMonthsFromNow,
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
