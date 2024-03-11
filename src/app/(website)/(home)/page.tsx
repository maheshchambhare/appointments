import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import Header from "./Header";
import HowItWorks from "./HowItWorks";
import Navbar from "@/app/components/Layouts/Navbar";
import { Metadata } from "next";
import Link from "next/link";
import { Dice1, Linkedin, Twitter } from "lucide-react";
import homeData from "@/utils/data/homepage.json";

export default function Home() {
  return (
    <main className="flex flex-col w-[100vw] min-h-[100vh] overflow-hidden">
      <div className="relative h-[100vh] w-full  ">
        <div className="absolute   inset-0 -z-10 h-full w-full items-center px-5  xsm:[background:radial-gradient(125%_125%_at_50%_10%,#0F0F0F_50%,#030637_100%)] lg:[background:radial-gradient(125%_125%_at_50%_10%,#0F0F0F_30%,#030637_100%)] " />
        <div className="w-full h-full flex justify-start   ">
          <div className="absolute bottom-0 left-0 -z-10 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#0F0F0F_70%,transparent_110%)]" />
          <ScreenWrapper>
            <Navbar />
            <Header />
          </ScreenWrapper>
        </div>
      </div>
      <div className="relative min-h-[70vh]  w-full">
        <div className="absolute   inset-0 -z-10 h-full w-full items-center px-5 py-24 xsm:[background:radial-gradient(125%_125%_at_50%_90%,#0F0F0F_50%,#030637_100%)] lg:[background:radial-gradient(125%_125%_at_50%_90%,#0F0F0F_30%,#030637_100%)] " />
        {/* How it works section */}
        <ScreenWrapper>
          <HowItWorks />
        </ScreenWrapper>
      </div>

      <div className="relative h-auto   bg-bgblack w-full   ">
        {/* How it works section */}

        <ScreenWrapper>
          <p className="text-center my-2">@2024 briefology</p>
          <div className="flex  w-full justify-center mb-6">
            <Link
              href="https://twitter.com/maheshchambhare"
              className="mr-4 cursor-pointer"
            >
              <Twitter />
            </Link>
            <Link
              href="https://www.linkedin.com/in/maheshchambhare/"
              className=" cursor-pointer"
            >
              <Linkedin className="cursor-pointer" />
            </Link>
          </div>
        </ScreenWrapper>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: `Appointify - ${homeData.title}`,
  description: homeData.description,
  icons: {
    icon: "/reading.webp",
  },
};
