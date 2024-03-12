"use client";

import React from "react";

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
    <div className="h-auto mt-2 pb-4 border-b-[1px] border-textPrimary  ">
      <h1 className="font-poppins text-base text-textPrimary capitalize md:text-xl">
        {title}
      </h1>
      <p className="font-poppins text-sm text-textSecondary my-1 md:text-base">
        {about}
      </p>
      <p className="font-poppins text-sm text-textSecondary md:text-base">
        {address}
      </p>
    </div>
  );
}

export default Header;
