import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const status = body.status;
    const id = body.businessId;

    const allAppointments = await prisma.appointments.findMany({
      where: {
        businessUserId: id,
        status,
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
