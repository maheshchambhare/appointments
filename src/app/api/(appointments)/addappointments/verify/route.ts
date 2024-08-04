import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
import adminApp from "@/app/components/utils/firebase/firebaseServer";
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

      if (decryptedOtp?.otp == otp) {
        const user = {
          name: decryptedOtp.appointmentData.name,
          mobile: JSON.stringify(decryptedOtp.appointmentData.mobile),
          sex: decryptedOtp.appointmentData.sex,
          verified: true,
        };

        let jsonToken = "";

        const createUser = await prisma.customer.create({
          data: user,
        });

        const appointmentData: any = {
          userId: createUser.id,
          businessUserId: decryptedOtp.appointmentData.businessUserId,
          slot: decryptedOtp.appointmentData.slot,
          date: decryptedOtp.appointmentData.date,
          memberId: decryptedOtp.appointmentData.memberId,
          serviceId: decryptedOtp.appointmentData.serviceId,
          status: "0",
        };

        const appointments = await prisma.appointment.create({
          data: appointmentData,
        });

        const tokens =
          decryptedOtp.businessFcm == decryptedOtp.memberFcm
            ? [decryptedOtp.businessFcm]
            : decryptedOtp.businessFcm && decryptedOtp.memberFcm
            ? [decryptedOtp.businessFcm, decryptedOtp.memberFcm]
            : [decryptedOtp.businessFcm];

        const message: any = {
          data: {
            appointment: JSON.stringify(appointments),
            customer: user.name,
            message: "Appointment added successfully",
          },
          tokens: tokens,
        };

        adminApp
          .messaging()
          .sendMulticast(message)
          .then((response) => {
            // Response is a message ID string.
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });

        const response = NextResponse.json(
          { message: "Successfully veified", data: appointments },
          { status: 200 }
        );
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        response.cookies.set("appointmentform", jsonToken, {
          httpOnly: true,
          secure: true,
          sameSite: true,
          expires: sixMonthsFromNow,
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
