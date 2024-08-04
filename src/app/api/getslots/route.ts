import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const appointments = await prisma.appointment.findMany({
      where: {
        employeeId: body.member,
        date: body.date,
      },
      select: {
        slot: true,
      },
    });

    const response = NextResponse.json(
      { slots: appointments },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { POST };
