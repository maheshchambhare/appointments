import prisma from "@/utils/prisma";
import { NextResponse, NextRequest } from "next/server";

import jwt from "jsonwebtoken";

const saltRounds = 10;
const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const GET = async (req: NextRequest) => {
  try {
    const tokenJWT = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      const employeeList = await prisma.employee.findMany({
        where: {
          businessUserId: businessVal.id,
        },
      });

      let employees = employeeList.map((d, i) => {
        return {
          name: d.name,
          mobile: d.mobile,
          avatar: d.avatar,
          designation: d.designation,
          id: d.id,
        };
      });

      const response = NextResponse.json(
        {
          employees,
        },
        { status: 200 }
      );

      return response;
    }
    const response = NextResponse.json(
      { message: "Business user not found" },
      { status: 400 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const businessUserId = body.businessUserId;

    const employeeList = await prisma.employee.findMany({
      where: {
        businessUserId,
      },
    });

    let employees = employeeList.map((d, i) => {
      return {
        name: d.name,
        mobile: d.mobile,
        avatar: d.avatar,
        designation: d.designation,
        id: d.id,
      };
    });

    const response = NextResponse.json(
      {
        employees,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { GET, POST };
