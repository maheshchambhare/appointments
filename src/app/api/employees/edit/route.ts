import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region: any = process.env.NEXT_PUBLIC_AWS_REGEION;
const accessKeyId: any = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const secretAccessKey: any = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;
const bucketName: any = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

const saltRounds = 10;
const JWTKEY: any = process.env.JWT_KEY_TOKEN;

const s3client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const isValidURL = (url: any) => {
  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return urlPattern.test(url);
};

const uploadFileS3 = async (file: any, fileName: any, folder: any) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${folder}/employee/${fileName}`,
    Body: file,
    ContentType: "image/webp",
  });

  await s3client.send(command);

  // You can now construct the public URL
  const publicUrl = `https://${bucketName}.s3.amazonaws.com/${folder}/employee/${fileName}`;

  return publicUrl;
};

const PUT = async (req: NextRequest) => {
  try {
    const body: any = await req.formData();
    const avatarImage: any = body.get("avatar");

    let dataObject: any = Object.fromEntries(body.entries());

    const tokenJWT = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      if (!isValidURL(avatarImage)) {
        const folderName = businessVal.businessName.trim();
        const bufferLogo = Buffer.from(await avatarImage.arrayBuffer());
        const avatarUrl = await uploadFileS3(
          bufferLogo,
          `${dataObject.name}.webp`,
          folderName
        );
        dataObject.avatar = avatarUrl;
      }

      const updatedUser = {
        ...dataObject,
      };

      const addmember = await prisma.employee.update({
        where: {
          id: dataObject.id,
        },
        data: updatedUser,
      });

      const response = NextResponse.json(
        { message: "Member added successfully", data: addmember },
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

export { PUT };
