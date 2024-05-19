import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const slug = body?.slug;
    const page = body?.page;

    const businessUser = await prisma.businessUser.findUnique({
      where: {
        slug: slug,
        AND: [{ verified: true }, { approved: true }],
      },

      include: {
        members: {
          select: {
            id: true,
            name: true,
            fcmToken: true,
          },
        },
      },
    });

    if (businessUser) {
      let jsonToken = "";

      console.log(businessUser, "OOOOOO");

      try {
        jsonToken = await jwt.sign(
          { id: businessUser.id, fcmToken: businessUser.fcmToken },
          JWTKEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          }
        );
      } catch (error) {
        console.error("Error generating token:", error);
      }

      const response = NextResponse.json(
        {
          data:
            page == "0"
              ? {
                  name: businessUser.businessName,
                  about: businessUser.about,
                  address: businessUser.address,
                  slug: businessUser.slug,
                  id: businessUser.id,
                  startTime: businessUser.startTime,
                  endTime: businessUser.endTime,
                  breakTimeStart: businessUser.breakTimeStart,
                  breakTimeEnd: businessUser.breakTimeEnd,
                }
              : {
                  name: businessUser.businessName,
                  about: businessUser.about,
                  address: businessUser.address,
                  members: businessUser.members,
                  weekdays: businessUser.weekdays,
                  startTime: businessUser.startTime,
                  endTime: businessUser.endTime,
                  breakTimeStart: businessUser.breakTimeStart,
                  breakTimeEnd: businessUser.breakTimeEnd,
                  slots: businessUser.slots,
                  slug: businessUser.slug,
                  id: businessUser.id,
                },
        },
        { status: 200 }
      );

      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

      response.cookies.set("appointify", jsonToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: sixMonthsFromNow,
      });

      return response;
    }

    const response = NextResponse.json(
      { message: "user not found" },
      { status: 404 }
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
