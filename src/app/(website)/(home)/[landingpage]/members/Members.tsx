"use client";
import React, { useState } from "react";
import MembersList from "./MembersList";
import AddMembers from "@/app/components/forms/AddMembers";

function Members() {
  return (
    <div className="flex xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
      {/* <div className="absolute z-[0] bg-black/20 h-full w-full rounded-md backdrop-blur-md blur-xl" /> */}
      <div className="relative xsm:w-[95%] mx-auto  md:w-[40%] z-1 ">
        <p className="text-base text-textPrimary dark:text-textPrimary">
          Add Member
        </p>
        <AddMembers />
      </div>
      <div className="relative xsm:w-[95%] mx-auto  md:w-[50%] z-1 mb-10">
        <p className="text-base text-textPrimary dark:text-textPrimary">
          Members List
        </p>
        <MembersList />
      </div>
    </div>
  );
}

export default Members;
