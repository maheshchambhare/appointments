import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const BUSINESSUSER: any = process.env.USERBUSINESS;
const MEMBERUSER: any = process.env.USERMEMBER;

const JWTUSER = process.env.JWT_KEY_USER;

const POST = async (req: Request) => {
  try {
    const body = await req.json();
    let userTypeId = BUSINESSUSER;
    //    Encrypt Password
    const password = body.password;
    const mobile = body.mobile;

    let businessUser;

    businessUser = await prisma.businessUser.findUnique({
      where: {
        mobile: mobile,
      },
    });

    if (businessUser == null) {
      const member: any = await prisma.member.findUnique({
        where: {
          mobile: mobile,
        },
        include: {
          BusinessUser: {
            select: {
              slug: true,
              id: true,
            },
          },
        },
      });
      userTypeId = MEMBERUSER;
      businessUser = {
        ...member,
        slug: member?.BusinessUser?.slug,
        businessName: member?.BusinessUser?.businessName,
      };
    }

    const checkPass = await bcrypt
      .compare(password, businessUser?.password)
      .then((result: boolean) => {
        return result == true;
      });

    if (checkPass) {
      let jsonToken = "";
      let userType = "";

      try {
        jsonToken = await jwt.sign(businessUser, JWTKEY, {
          expiresIn: 31556926, // 1 year in seconds
        });
      } catch (error) {
        console.error("Error generating token:", error);
      }

      if (userTypeId == BUSINESSUSER) {
        if (businessUser?.approved) {
          const response = NextResponse.json(
            {
              name: businessUser.name,
              slug: businessUser.slug,
              about: businessUser.about,
              businessName: businessUser.businessName,
              address: businessUser.address,
              mobile: businessUser.mobile,
              userType: userTypeId == BUSINESSUSER ? 0 : 1,
            },
            { status: 200 }
          );

          response.cookies.set("token", jsonToken, {
            httpOnly: true,
            secure: false,
            sameSite: false,
          });
          response.cookies.set("appointifyUser", userTypeId);
          return response;
        } else {
          return NextResponse.json(
            {
              message:
                "Your account is not approved by us, we will get back to you soon",
            },
            { status: 404 }
          );
        }
      } else {
        const response = NextResponse.json(
          {
            name: businessUser.name,
            slug: businessUser.slug,
            about: businessUser.about,
            businessName: businessUser.businessName,
            address: businessUser.address,
            mobile: businessUser.mobile,
            userType: userTypeId == BUSINESSUSER ? 0 : 1,
          },
          { status: 200 }
        );

        response.cookies.set("token", jsonToken, {
          httpOnly: true,
          secure: false,
          sameSite: false,
        });
        response.cookies.set("appointifyUser", userTypeId);
        return response;
      }
    }

    const response = NextResponse.json(
      { message: "Login password is not valid" },
      { status: 400 }
    );
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed on server,contact admin", error },
      { status: 500 }
    );
  }
};

export { POST };
