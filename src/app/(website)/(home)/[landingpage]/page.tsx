import { Metadata } from "next";
import React from "react";
import Header from "./Header";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import MoreSection from "./MoreSection";
import { API_URL } from "@/utils/constants";

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
  let options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug: params.landingpage }),
  };

  const businessLandingPage = await fetch(API_URL + "slug", options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("error00000:" + err));

  const businessData = businessLandingPage.data;

  const title = businessData?.businessName;
  const about = businessData?.about;
  const address = businessData?.address;

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
