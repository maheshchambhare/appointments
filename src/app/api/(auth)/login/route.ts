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
      const member: any = await prisma.employee.findUnique({
        where: {
          mobile: mobile,
        },
        include: {
          businessUser: {
            select: {
              slug: true,
              id: true,
            },
          },
        },
      });

      const updatedMember = await prisma.employee.update({
        where: {
          mobile: mobile,
        },
        data: {
          fcmToken: body.fcmToken,
        },
      });

      userTypeId = MEMBERUSER;
      businessUser = {
        ...member,
        slug: member?.BusinessUser?.slug,
        businessName: member?.BusinessUser?.businessName,
        businessFcmToken: member.BusinessUser.fcmToken,
        memberFcmToken: body.fcmToken,
      };
    } else {
      const updated = await prisma.businessUser.update({
        where: {
          mobile: mobile,
        },
        data: {
          fcmToken: body.fcmToken,
        },
      });
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
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

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
            sameSite: "lax",
            expires: sixMonthsFromNow,
          });
          response.cookies.set("appointifyUser", userTypeId, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            expires: sixMonthsFromNow,
          });

          response.cookies.set(
            "businessUser",
            JSON.stringify({
              name: businessUser.name,
              slug: businessUser.slug,
              about: businessUser.about,
              businessName: businessUser.businessName,
              address: businessUser.address,
              mobile: businessUser.mobile,
              userType: userTypeId == BUSINESSUSER ? 0 : 1,
            }),
            {
              httpOnly: false,
              secure: false,
              sameSite: false,
              expires: sixMonthsFromNow,
            }
          );
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
          sameSite: "lax",
          expires: sixMonthsFromNow,
        });
        response.cookies.set("appointifyUser", userTypeId, {
          httpOnly: false,
          secure: false,
          sameSite: "lax",
          expires: sixMonthsFromNow,
        });
        response.cookies.set(
          "businessUser",
          JSON.stringify({
            name: businessUser.name,
            slug: businessUser.slug,
            about: businessUser.about,
            businessName: businessUser.businessName,
            address: businessUser.address,
            mobile: businessUser.mobile,
            userType: userTypeId == BUSINESSUSER ? 0 : 1,
            startTime: businessUser.startTime,
            endTime: businessUser.endTime,
          }),
          {
            httpOnly: false,
            secure: false,
            sameSite: false,
            expires: sixMonthsFromNow,
          }
        );

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
