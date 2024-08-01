import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const POST = async (req: NextRequest) => {
  try {
    let slugToken = "";
    const tokenJWT: any = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      slugToken = businessVal.slug;
    }

    const body: any = await req.json();
    const slug = body.slug != null ? body.slug : slugToken;

    try {
      const prismaRes = await prisma.website.findFirst({
        where: {
          slug: slug,
          live: true,
        },
      });

      const response = NextResponse.json(
        { website: prismaRes },
        { status: 200 }
      );
      return response;
    } catch (e) {
      console.error(e, "Uploading failed");
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
