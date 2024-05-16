import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const cookie = req.cookies.get("token");

    const businessUserCookie: any =
      typeof cookie != "undefined" ? cookie?.value : null;
    const businessUSER: any =
      typeof cookie != "undefined"
        ? await jwt.verify(businessUserCookie, JWTKEY)
        : null;

    const status = body.status;
    const id = typeof cookie != "undefined" ? businessUSER.id : body.id;

    const allAppointments = await prisma.appointments.findMany({
      where: {
        OR: [
          {
            businessUserId: id,
          },
          {
            memberId: id,
          },
        ],
        status,
      },
      include: {
        User: {
          select: {
            name: true,
            mobile: true,
          },
        },
        service: {
          select: {
            name: true,
            price: true,
          },
        },
        Member: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { appointments: allAppointments },
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

export { POST };
