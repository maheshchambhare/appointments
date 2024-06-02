import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import React from "react";
import Members from "./Members";
import homeData from "@/utils/data/homepage.json";
import { Metadata } from "next";
import Footer from "@/app/components/Layouts/Footer";

function page() {
  //   const businessData = store.getState().auth.userData;

  //   const title = businessData?.businessName;
  //   const about = businessData?.about;
  //   const address = businessData?.address;

  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      <div className="relative h-auto w-full mb-10  ">
        <ScreenWrapper>
          <Navbar />
          {/* <Header title={title} about={about} address={address} /> */}
          <Members />
        </ScreenWrapper>
      </div>
      <Footer />
    </main>
  );
}

export default page;

export const metadata: Metadata = {
  title: `Appointify - members`,
  description: homeData.description,
  icons: {
    icon: "/logo.webp",
  },
};
