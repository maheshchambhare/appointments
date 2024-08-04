import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const JWTKEYOTP: any = process.env.JWT_KEY_OTP;

const POST = async (req: NextRequest) => {
  try {
    const cookie = req.cookies.get("userauth");
    const userToken: any = cookie?.value;

    const userTokenDecrypted: any = await jwt.verify(userToken, JWTKEYOTP);

    const body = await req.json();
    const slug = body?.slug || userTokenDecrypted.businessUser.slug;
    const page = body?.page;

    const businessUser = await prisma.businessUser.findUnique({
      where: {
        slug: slug,
        AND: [{ verified: true }, { approved: true }],
      },

      include: {
        employees: {
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
                  address: businessUser.address,
                  slug: businessUser.slug,
                  id: businessUser.id,
                }
              : {
                  name: businessUser.businessName,
                  address: businessUser.address,
                  employee: businessUser.employees,
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
