"use client";

import React from "react";
import ScreenWrapper from "./ScreenWrapper";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { useSelector } from "react-redux";
import { getBusinessLoggedIn, getUserData } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import Horizontallinks from "./Horizontallinks";

function Footer({ website }: any) {
  const businessUserData = useSelector(getUserData);
  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);
  const router = useRouter();

  return (
    <div className="relative h-auto overflow-hidden  pt-10  shadow-md border-t-[1px]   border-foreground     w-full ">
      <ScreenWrapper>
        <div className="relative  px-4 md:px-0    text-foreground     py-4 mx-auto">
          <div className="mb-10 flex flex-col md:flex-row   justify-between">
            <div className="flex flex-col w-[90%] md:w-[50%] ">
              <h1
                onClick={() => {
                  if (isBusinessLoggedIn) {
                    router.push("/" + businessUserData.slug);
                  } else {
                    router.push("/");
                  }
                }}
                className=" w-full font-tank  cursor-pointer xsm:text-[20px] md:text-[30px] text-[30px] text-foreground font-bold "
              >
                {"Appointify"}
              </h1>
              <p className="text-sm text-foreground max-w-[300px]">
                {
                  "Appointify is the ultimate solution for businesses to seamlessly manage appointments and tickets online. Say goodbye to scheduling headaches and hello to a more organized and efficient way of running your business."
                }
              </p>

              {/* <Horizontallinks website={website} /> */}
            </div>

            <div className=" w-[200px] mt-6   md:mt-o flex  flex-col text-foreground ">
              <p className="text-lg underline">Links</p>
              <Link href="/contact-us" className="mb-1 text-sm  cursor-pointer">
                Contact Us
              </Link>
              <Link
                href="/cookie-policy"
                className="mb-1 text-sm   cursor-pointer"
              >
                Cookie Policy
              </Link>
              <Link
                href="/privacy-policy"
                className="mb-1 text-sm  cursor-pointer"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="mb-1 text-sm   cursor-pointer"
              >
                Terms And Condition
              </Link>

              <Link
                href="/refund-and-cancellation"
                className="mb-1  text-sm cursor-pointer"
              >
                Refund and Cancellation
              </Link>
            </div>
          </div>

          <p className="text-center my-2 text-foreground">@2024 appointify</p>
          <div className="flex  w-full justify-center mb-6">
            <Link
              href="https://twitter.com/maheshchambhare"
              className="mr-4 cursor-pointer"
            >
              <Twitter className="text-foreground" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/maheshchambhare/"
              className=" cursor-pointer"
            >
              <Linkedin className="cursor-pointer text-foreground" />
            </Link>
          </div>
        </div>
      </ScreenWrapper>
    </div>
  );
}

export default Footer;
