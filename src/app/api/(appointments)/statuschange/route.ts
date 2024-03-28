import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const cookie = req.cookies.get("token");

    const businessUserCookie: any = cookie?.value;
    const businessUSER: any = await jwt.verify(businessUserCookie, JWTKEY);

    const status = body.status;
    const id = body.id;

    const allAppointments = await prisma.appointments.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json(
      { message: "Appointment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { PUT };
