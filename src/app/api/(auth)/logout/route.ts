import { NextResponse } from "next/server";

const GET = async (req: Request) => {
  try {
    const response = NextResponse.json(
      { message: "Logout successfull" },
      { status: 200 }
    );

    response.cookies.delete("token");
    response.cookies.delete("appointifyUser");
    response.cookies.delete("appointify");
    response.cookies.delete("businessUser");

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something failed", error },
      { status: 500 }
    );
  }
};

export { GET };
