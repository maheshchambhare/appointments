"use client";
import Footer from "@/app/components/Layouts/Footer";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import Profile from "@/app/components/forms/Profile";
import { getUserData } from "@/store/slices/authSlice";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const router = useRouter();
  const businessUserData = useSelector(getUserData);

  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      <div className="relative h-auto w-full mb-10  ">
        <ScreenWrapper>
          <Navbar />
          <div className="flex xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
            {/* <div className="absolute z-[0] bg-black/20 h-full w-full rounded-md backdrop-blur-md blur-xl" /> */}

            <div className="relative xsm:w-[95%] mx-auto  md:w-[40%] z-1 ">
              <div className="flex  ml-[-10px] items-center">
                <ChevronLeft
                  onClick={() => {
                    router.push("/" + businessUserData.slug);
                  }}
                  className="text-textPrimary cursor-pointer"
                />
                <p className="text-xl text-textPrimary dark:text-textPrimary">
                  Edit Profile
                </p>
              </div>
              <Profile />
            </div>
          </div>
        </ScreenWrapper>
      </div>
      <Footer />
    </main>
  );
}

export default ProfilePage;
