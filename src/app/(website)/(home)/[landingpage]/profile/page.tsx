"use client";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import Profile from "@/app/components/forms/Profile";
import { ChevronLeft } from "lucide-react";
import React from "react";

function page() {
  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      <div className="relative h-auto w-full  ">
        <ScreenWrapper>
          <Navbar />
          <div className="flex xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
            {/* <div className="absolute z-[0] bg-black/20 h-full w-full rounded-md backdrop-blur-md blur-xl" /> */}

            <div className="relative xsm:w-[95%] mx-auto  md:w-[40%] z-1 ">
              <p className="text-lg text-textPrimary dark:text-textPrimary">
                Edit Profile
              </p>
              <Profile />
            </div>
          </div>
        </ScreenWrapper>
      </div>
    </main>
  );
}

export default page;
