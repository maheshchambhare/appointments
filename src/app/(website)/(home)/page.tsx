import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import Header from "./Header";
import HowItWorks from "./HowItWorks";
import Navbar from "@/app/components/Layouts/Navbar";
import { Metadata } from "next";
import Footer from "@/app/components/Layouts/Footer";
import homeData from "@/utils/data/homepage.json";
import YoutubeVideo from "./YoutubeVideo";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-background min-h-[100vh] overflow-hidden overflow-x-hidden">
      <div className="relative h-[100vh] w-full  ">
        {/* <div className="absolute   inset-0 -z-10 h-full w-full items-center px-5  xsm:[background:radial-gradient(125%_125%_at_50%_10%,#0F0F0F_50%,#030637_100%)] lg:[background:radial-gradient(125%_125%_at_50%_10%,#0F0F0F_30%,#030637_100%)] " /> */}
        <div className="w-full h-full flex justify-start   ">
          {/* <div className="absolute bottom-0 left-0 -z-10 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#0F0F0F_70%,transparent_110%)]" /> */}
          <ScreenWrapper>
            <Navbar />
            <Header />
          </ScreenWrapper>
        </div>
      </div>
      <div className="relative min-h-[70vh]  w-full ">
        <div className="absolute   inset-0 -z-10 h-full w-full items-center px-5 py-24 xsm:[background:radial-gradient(125%_125%_at_50%_90%,#0F0F0F_50%,#030637_100%)] lg:[background:radial-gradient(125%_125%_at_50%_90%,#0F0F0F_30%,#030637_100%)] " />

        <ScreenWrapper>
          <HowItWorks />
        </ScreenWrapper>

        <ScreenWrapper>
          <YoutubeVideo />
        </ScreenWrapper>
      </div>

      {/* How it works section */}

      <Footer />
    </main>
  );
}

export const metadata: Metadata = {
  title: `Appointify - ${homeData.title}`,
  description: homeData.description,
  icons: {
    icon: "/logo.webp",
  },
  openGraph: {
    title: `Appointify - ${homeData.title}`,
    description: homeData.description,
    images: [{ url: "https://appointify.in/banner.webp" }],
    url: "https://appointify.in",
    siteName: "Appointify",
  },
};
