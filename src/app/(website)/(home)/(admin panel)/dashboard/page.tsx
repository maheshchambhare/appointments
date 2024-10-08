import { Metadata } from "next";
import React from "react";

import homeData from "@/utils/data/homepage.json";
import Footer from "@/app/components/Layouts/Footer";
import { Dashboard } from "@/app/components/Layouts/Dashboard";
import PageSection from "../../[landingpage]/PageSection";

interface ParamsType {
  // Define the structure of params object
  landingpage: string;
}

interface SearchParamsType {
  // Define the structure of searchParams object
}

async function page({
  params,
  searchParams,
}: {
  params: ParamsType;
  searchParams: SearchParamsType;
}) {
  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      {/* <Dashboard /> */}
      <PageSection />
      <Footer />
    </main>
  );
}

export default page;

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
  },
};
