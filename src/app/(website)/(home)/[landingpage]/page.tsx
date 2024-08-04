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

export const generateMetadata = async (props: any) => {
  const { params } = props;

  const slug = params.landingpage;

  const config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}website/getdata`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { slug },
  };

  try {
    const response = await axios(config);

    const websiteOwner = response.data.website;

    if (websiteOwner == null) {
      return redirect(`/404`);
    }

    return {
      metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
      title: websiteOwner?.businessName + " - " + websiteOwner?.title,
      description: websiteOwner?.subtitle,
      openGraph: {
        title: websiteOwner?.title,
        description: websiteOwner?.subtitle,
        type: "website",
        url: process.env.NEXT_PUBLIC_BASE_URL + websiteOwner?.slug,
        images: [
          {
            url: websiteOwner?.heroImage,
          },
        ],
      },
      alternates: {
        canonical: process.env.NEXT_PUBLIC_BASE_URL + websiteOwner?.slug,
      },
      icons: {
        icon: [
          {
            url: websiteOwner?.logo,
            href: websiteOwner?.logo,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching data========:-------------------", error);
  }
};

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

  const days = website.weekdays.filter((d: any, i: any) => d.isActive);
  const daysString = days.map((day: any) => day.name.substring(0, 3)).join(",");

  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      {/* <Dashboard /> */}
      {/* <PageSection landingpage={params.landingpage} />
      <Footer /> */}
      <Landingpage website={website} daysString={daysString} />
    </main>
  );
}

export default page;
