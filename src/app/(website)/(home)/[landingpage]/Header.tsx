"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/utils/cn";

function Header({
  title,
  about,
  address,
}: {
  title: string;
  about: string;
  address: string;
}) {
  return (
    <div className="h-auto  mt-6 mb-6 md:mb-10 pb-4  border-b-2 border-white/10  shadow-md  ">
      <h1 className="font-mont text-center text-[40px] text-textPrimary capitalize md:text-[70px]">
        {title}
      </h1>
      <p className="font-poppins max-w-[500px] mx-auto text-center mt-[-10px] mb-2 text-md text-textSecondary md:text-base">
        {about}
      </p>
      {address && (
        <div className="flex justify-center text-textPrimary items-center">
          <MapPin size={16} />
          <p className="font-poppins ml-2 text-sm text-textTextprimary md:text-base">
            {address}
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
