"use client";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import StepperDemo from "@/components/ui/Stepper";
import React from "react";

function page() {
  return (
    <main className="flex flex-col w-full bg-background min-h-[100vh] overflow-hidden overflow-x-hidden">
      <ScreenWrapper>
        <Navbar />
        <div className="mt-20 ">
          <StepperDemo />
        </div>
      </ScreenWrapper>
    </main>
  );
}

export default page;
