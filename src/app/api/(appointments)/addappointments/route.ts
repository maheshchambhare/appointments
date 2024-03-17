import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const JWTKEYOTP: any = process.env.JWT_KEY_OTP;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const doesUserExist = body.doesUserExist;
    const businessId = body.businessId;

    const cookie = req.cookies.get("appointmentform");
    const customerDataCookie = req.cookies.get("customer");

    if (cookie) {
      const appointmentFromCookie = cookie?.value;

      const appintmentForm: any = await jwt.verify(
        appointmentFromCookie,
        JWTKEY
      );

      const customerData = {
        name: body.name,
        mobile: body.mobile,
        dob: body.dob,
        sex: body.sex,
        verified: body.verified,
      };

      if (!doesUserExist) {
        const user = await prisma.user.create({
          data: customerData,
        });

        const appointment = {
          userId: user.id,
          businessUserId: businessId,
          slot: "",
          status: "",
          ticketId: "",
        };

        const addAppointment = await prisma.appointments.create({
          data: appointment,
        });

        let jsonToken = "";

        try {
          jsonToken = await jwt.sign(user, JWTKEY, {
            expiresIn: 31556926, // 1 year in seconds
          });
        } catch (error) {
          console.error("Error generating token:", error);
        }

        const response = NextResponse.json(
          { message: "Appointment added" },
          { status: 200 }
        );
        response.cookies.set("customer", jsonToken, {
          httpOnly: true,
          secure: true,
          sameSite: true,
        });

        response.cookies.delete("userauth");
        return response;
      } else {
        const customer = customerDataCookie?.value;

        const appointment = {
          userId: customer?.id,
          businessUserId: businessId,
          slot: "",
          status: "",
          ticketId: "",
        };

        const addAppointment = await prisma.appointments.create({
          data: appointment,
        });

        const response = NextResponse.json(
          { message: "Appointment added" },
          { status: 200 }
        );

        return response;
      }
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
