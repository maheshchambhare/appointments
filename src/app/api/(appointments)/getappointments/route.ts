import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";
const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const cookie = req.cookies.get("token");

    const businessUserCookie: any = cookie?.value;
    const businessUSER: any = await jwt.verify(businessUserCookie, JWTKEY);

    const status = body.status;
    const id = businessUSER.id;

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
