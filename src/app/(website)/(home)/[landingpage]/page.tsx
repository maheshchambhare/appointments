import { Metadata } from "next";
import React from "react";
import Landingpage from "./customerview/Landingpage";
import axios from "axios";
import { redirect } from "next/navigation";
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
  const slug = params.landingpage;

  let website = null;

  const config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}website/getdata`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { slug },
  };

  if (slug) {
    try {
      const response = await axios(config);

      website = response.data.website;
    } catch (error) {
      console.error("Error fetching data========:-------------------", error);
    }
  }

  if (website == null && slug) {
    return redirect(`/404`);
  }

  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      {/* <Dashboard /> */}
      {/* <PageSection landingpage={params.landingpage} />
      <Footer /> */}
      <Landingpage website={website} />
    </main>
  );
}

export default page;

// export const metadata: Metadata = {
//   title: `Appointify - ${homeData.title}`,
//   description: homeData.description,
//   icons: {
//     icon: "/logo.webp",
//   },
//   openGraph: {
//     title: `Appointify - ${homeData.title}`,
//     description: homeData.description,
//     images: [{ url: "https://appointify.in/banner.webp" }],
//     url: "https://appointify.in",
//   },
// };
