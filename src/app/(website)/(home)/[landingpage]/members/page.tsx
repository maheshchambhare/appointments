import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import React from "react";
import Header from "../Header";
import store from "@/store/store";
import Members from "./Members";

function page() {
  //   const businessData = store.getState().auth.userData;

  //   const title = businessData?.businessName;
  //   const about = businessData?.about;
  //   const address = businessData?.address;

  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      <div className="relative h-auto w-full  ">
        <ScreenWrapper>
          <Navbar />
          {/* <Header title={title} about={about} address={address} /> */}
          <Members />
        </ScreenWrapper>
      </div>
    </main>
  );
}

export default page;