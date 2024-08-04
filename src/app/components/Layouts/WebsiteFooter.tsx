"use client";

import React from "react";
import ScreenWrapper from "./ScreenWrapper";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { useSelector } from "react-redux";
import { getBusinessLoggedIn, getUserData } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import Horizontallinks from "./Horizontallinks";
import Image from "next/image";
import moment from "moment";

function WebsiteFooter({ website }: any) {
  const businessUserData = useSelector(getUserData);
  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);
  const router = useRouter();

  return (
    <div className="relative h-auto overflow-hidden  pt-10  shadow-md border-t-[1px]   border-foreground     w-full ">
      <ScreenWrapper>
        <div className="relative  px-4 md:px-0    text-foreground     pt-4 mx-auto">
          <div className="mb-10 flex    justify-center">
            <div className="flex flex-col w-full justify-center items-center ">
              <Image
                height={100}
                width={100}
                alt={website.businessName + " logo"}
                src={website.logo}
              />
              <h1
                onClick={() => {
                  if (isBusinessLoggedIn) {
                    router.push("/" + businessUserData.slug);
                  } else {
                    router.push("/");
                  }
                }}
                className=" w-full font-tank text-center  cursor-pointer xsm:text-[20px] md:text-[30px] text-[30px] text-foreground font-bold "
              >
                {website ? website.businessName : "Appointify"}
              </h1>
              <p className="text-sm text-foreground max-w-[300px]">
                {website
                  ? website.subtitle
                  : "Appointify is the ultimate solution for businesses to seamlessly manage appointments and tickets online. Say goodbye to scheduling headaches and hello to a more organized and efficient way of running your business."}
              </p>

              <Horizontallinks website={website} />
            </div>
          </div>

          <p className="text-center my-2 text-sm text-foreground">
            @2024 appointify
          </p>
          <div className="flex  w-full justify-center mb-6">
            <Link
              href="https://twitter.com/maheshchambhare"
              className="mr-4 cursor-pointer"
            >
              <Twitter size={16} className="text-foreground" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/maheshchambhare/"
              className=" cursor-pointer"
            >
              <Linkedin size={16} className="cursor-pointer text-foreground" />
            </Link>
          </div>
        </div>
      </ScreenWrapper>
    </div>
  );
}

export default WebsiteFooter;
