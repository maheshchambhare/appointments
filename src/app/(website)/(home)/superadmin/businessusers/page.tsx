import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import React from "react";
import BusinessUsers from "./BusinessUsers";

function page() {
  return (
    <main className="flex flex-col w-[100vw] min-h-[100vh] overflow-hidden">
      <div className="relative h-[100vh] w-full  ">
        <div className="absolute   inset-0 -z-10 h-full w-full items-center px-5  xsm:[background:radial-gradient(125%_125%_at_50%_10%,#0F0F0F_50%,#030637_100%)] lg:[background:radial-gradient(125%_125%_at_50%_10%,#0F0F0F_30%,#030637_100%)] " />
        <div className="w-full h-full flex justify-start">
          <div className="absolute bottom-0 left-0 -z-10 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#0F0F0F_70%,transparent_110%)]" />
          <ScreenWrapper>
            <BusinessUsers />
          </ScreenWrapper>
        </div>
      </div>
    </main>
  );
}

export default page;
