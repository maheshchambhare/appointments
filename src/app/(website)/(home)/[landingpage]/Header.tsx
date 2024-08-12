"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/utils/cn";
import { ButtonShad } from "@/app/components/ui/Buttons";

function Header({ title, slug }: { title: string; slug: string }) {
  return (
    <div className="h-auto  mt-6 mb-10 md:mb-10 pb-4  flex flex-col justify-center items-center ">
      <h1 className="font-mont text-center text-[40px] text-textPrimary capitalize md:text-[70px]">
        {title}
      </h1>

      <p className="mt-10 text-center text-foreground text-sm md:text-base">
        {`We're continually working to enhance and improve our site, bringing you
        the best possible experience. While we're still perfecting everything,
        you can get started right away by generating your own free site. Simply
        complete a few forms, and you'll be on your way to creating something
        amazing. Thank you for your patience as we make things even better for
        you!`}
      </p>

      <p className="mt-10 text-center text-red-400 text-sm md:text-base">
        Submit all forms which are given in menu before clicking on preview
        website
      </p>

      <ButtonShad
        onClick={() => {
          window.open(process.env.NEXT_PUBLIC_BASE_URL + slug, "_blank");
        }}
        className="mx-auto mt-6"
      >
        Preview Website
      </ButtonShad>
    </div>
  );
}

export default Header;
