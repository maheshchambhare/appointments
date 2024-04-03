import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWTKEY = process.env.JWT_KEY_TOKEN;

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const memberLength = body.member;
    const id = body.id;
    const isApproved = body.approve;
    const tokenJWT = req.cookies.get("admin");
    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal = await jwt.verify(tokenJWTVal, JWTKEY);

      const superadmin = await prisma.superAdmin.findMany({
        where: {
          id: businessVal.id,
        },
      });

      if (superadmin) {
        const businessUser = await prisma.businessUser.update({
          where: { id: id },
          data: {
            approved: isApproved,
            membersLength: memberLength,
          },
        });
        const response = NextResponse.json(
          { users: businessUser },
          { status: 200 }
        );
        return response;
      } else {
        const response = NextResponse.json(
          { message: "user not found" },
          { status: 404 }
        );
        return response;
      }
    }

    const response = NextResponse.json(
      { message: "user not found" },
      { status: 404 }
    );
    return response;
  } catch (error) {
    console.log(error, "ERRR");
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { POST };
