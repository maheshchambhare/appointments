import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import jwt from "jsonwebtoken";
import sharp from "sharp";

const JWTKEY: any = process.env.JWT_KEY_TOKEN;
const region: any = process.env.NEXT_PUBLIC_AWS_REGEION;
const accessKeyId: any = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const secretAccessKey: any = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;
const bucketName: any = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

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
    Key: `${folder}/${fileName}`,
    Body: file,
    ContentType: "image/webp",
  });

  await s3client.send(command);

  // You can now construct the public URL
  const publicUrl = `https://${bucketName}.s3.amazonaws.com/${folder}/${fileName}`;

  return publicUrl;
};

const POST = async (req: NextRequest) => {
  try {
    const tokenJWT: any = req.cookies.get("token");

    if (tokenJWT) {
      const tokenJWTVal = tokenJWT?.value;

      const businessVal: any = await jwt.verify(tokenJWTVal, JWTKEY);

      const body: any = await req.formData();
      const logo: any = body.get("logo");
      const heroImage: any = body.get("heroImage");

      let dataObject: any = Object.fromEntries(body.entries());

      try {
        const folderName = businessVal.businessName.trim();

        if (!isValidURL(logo)) {
          const bufferLogo = Buffer.from(await logo.arrayBuffer());
          const roundedImageBuffer = await sharp(bufferLogo)
            .resize(256, 256) // Adjust the size as needed
            .composite([
              {
                input: Buffer.from(
                  `<svg width="256" height="256"><circle cx="128" cy="128" r="128" fill="black"/></svg>`
                ),
                blend: "dest-in",
              },
            ])
            .toFormat("webp")
            .toBuffer();
          const logoUrl = await uploadFileS3(
            roundedImageBuffer,
            "logo.webp",
            folderName
          );

          dataObject.logo = logoUrl;
        }

        if (!isValidURL(heroImage)) {
          const bufferHero = Buffer.from(await heroImage.arrayBuffer());

          const heroUrl = await uploadFileS3(
            bufferHero,
            "hero.webp",
            folderName
          );
          dataObject.heroImage = heroUrl;
        }

        dataObject.weekdays = JSON.parse(dataObject.weekdays);
        dataObject.slug = businessVal.slug;
        dataObject.live = true;
        dataObject.businessUserId = businessVal.id;
        dataObject.businessName = businessVal.businessName;
        dataObject.country = JSON.parse(dataObject.country);

        const prismaRes = await prisma.website.upsert({
          where: {
            businessUserId: businessVal.id,
          },
          update: { ...dataObject },
          create: { ...dataObject },
        });

        const response = NextResponse.json(
          { website: prismaRes },
          { status: 200 }
        );
        return response;
      } catch (e) {
        console.error(e, "Uploading failed");
        return NextResponse.json(
          { message: "Something failed", e },
          { status: 500 }
        );
      }
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
