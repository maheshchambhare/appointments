"use client";

import React from "react";
import ScreenWrapper from "./ScreenWrapper";
import Link from "next/link";
import { Dice1, Linkedin, Twitter } from "lucide-react";
import { useSelector } from "react-redux";
import { getBusinessLoggedIn, getUserData } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

function Footer() {
  const businessUserData = useSelector(getUserData);
  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);
  const router = useRouter();
  return (
    <div className="relative h-auto bg-background   w-full   ">
      <div className="border-t-2 bg-black text-textPrimary border-l-2 border-r-2 rounded-t-lg shadow-md border-white/10 py-4 mx-4">
        <ScreenWrapper>
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-col w-[90%] md:w-[50%] ">
              <h1
                onClick={() => {
                  if (isBusinessLoggedIn) {
                    router.push("/" + businessUserData.slug);
                  } else {
                    router.push("/");
                  }
                }}
                className=" w-full font-mont  cursor-pointer xsm:text-[20px] md:text-[30px] text-[30px] text-textPrimary font-bold "
              >
                APPOINTIFY
              </h1>
              <p className="text-sm">
                Appointify is the ultimate solution for businesses to seamlessly
                manage appointments and tickets online. Say goodbye to
                scheduling headaches and hello to a more organized and efficient
                way of running your business.
              </p>
            </div>

            <div className=" w-[200px]  mt-6 md:mt-o flex  flex-col ">
              <p className="text-lg underline">Links</p>
              <Link href="/contact-us" className="mb-1   cursor-pointer">
                Contact Us
              </Link>
              <Link href="/cookie-policy" className="mb-1    cursor-pointer">
                Cookie Policy
              </Link>
              <Link href="/privacy-policy" className="mb-1   cursor-pointer">
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="mb-1   cursor-pointer"
              >
                Terms And Condition
              </Link>

              <Link
                href="/refund-and-cancellation"
                className="mb-1   cursor-pointer"
              >
                Refund and Cancellation
              </Link>
            </div>
          </div>

          <p className="text-center my-2 text-textPrimary">@2024 appointify</p>
          <div className="flex  w-full justify-center mb-6">
            <Link
              href="https://twitter.com/maheshchambhare"
              className="mr-4 cursor-pointer"
            >
              <Twitter className="text-textPrimary" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/maheshchambhare/"
              className=" cursor-pointer"
            >
              <Linkedin className="cursor-pointer text-textPrimary" />
            </Link>
          </div>
        </ScreenWrapper>
      </div>
    </div>
  );
}

export default Footer;
