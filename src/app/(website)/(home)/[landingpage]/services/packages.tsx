"use client";
import AnimatedBtn from "@/app/components/ui/AnimatedBtn";

import React, { useEffect, useState } from "react";

function Packages({ packages }: { packages: any }) {
  if (packages == null) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-[100%] md:w-[50%] mb-10">
      <p className="text-xl text-textPrimary dark:text-textPrimary">
        Services List
      </p>
      <div className="grid gap-4 xsm:grid-cols-1 pt-6 md:grid-cols-2">
        {packages.length == 0 ? (
          <p>No Services found</p>
        ) : (
          packages.map((packageData: any, ind: any) => {
            return (
              <div
                className="flex flex-col text-textPrimary w-full p-2 border border-[#ffffff30] rounded-lg shadow-md  "
                key={packageData.id}
              >
                {packageData.name}

                <p>
                  Duration:{" "}
                  {packageData.duration.hours > 0 &&
                    packageData.duration.hours + " hr,"}
                  {packageData.duration.minutes > 0 &&
                    packageData.duration.minutes + " min"}
                </p>
                <p>{packageData.gender}</p>
                <p>₹ {packageData.price}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Packages;
