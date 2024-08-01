import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

const PUT = async (req: NextRequest) => {
  try {
    const body: any = await req.json();

    const updateCategory = await prisma.category.update({
      where: {
        id: body.id,
      },
      data: { name: body.name },
    });

    const response = NextResponse.json(
      { message: "Category updated successfully", data: updateCategory },
      { status: 200 }
    );

    return response;

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
