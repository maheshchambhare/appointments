import { Metadata } from "next";
import React from "react";
import Header from "./Header";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import MoreSection from "./MoreSection";
import { API_URL } from "@/utils/constants";
import axios from "axios";
import store from "@/store/store";
import { setUserData } from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
interface ParamsType {
  // Define the structure of params object
  landingpage: string;
}

interface SearchParamsType {
  // Define the structure of searchParams object
}

async function page({
  params,
  searchParams,
}: {
  params: ParamsType;
  searchParams: SearchParamsType;
}) {
  let businessLandingPage = null;
  if (params?.landingpage != "favicon.ico") {
    const options = {
      method: "post",
      url: API_URL + "slug",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        cache: "no-store",
      },
      data: {
        slug: params.landingpage,
      },
    };

    try {
      const response = await axios(options);
      businessLandingPage = response.data;
    } catch (error) {
      console.error("error00000:" + error);
    }
  }

  const businessData = businessLandingPage?.data;

  const title = businessData?.businessName;
  const about = businessData?.about;
  const address = businessData?.address;
  if (businessData) {
    store.dispatch(setUserData(businessData));
  }
  if (businessData) {
    return (
      <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
        <div className="relative h-auto w-full  ">
          <ScreenWrapper>
            <Navbar />
            <Header title={title} about={about} address={address} />
            <MoreSection businessData={businessData} />
          </ScreenWrapper>
        </div>
      </main>
    );
  } else {
    return redirect(params.landingpage + "/appointment");
  }
}

export default page;

export const metadata: Metadata = {
  title: "Breifology - Your Gateway to Quick Knowledge",
  description:
    "your ultimate tool for quick, concise summaries generated by AI!, Say goodbye to long hours of reading and let Briefology empower you with the information you need, when you need it.",
  icons: {
    icon: "/reading.webp",
  },
};
