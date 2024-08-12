"use client";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import NavbarWebsite from "@/app/components/Layouts/NavbarWebsite";
import HeroSection from "./HeroSection";
import LinksSidebar from "@/app/components/Layouts/LinksSidebar";
import dynamic from "next/dynamic";
import Script from "next/script";
import moment from "moment";
import axios from "axios";

const DynamicFooter = dynamic(
  () => import("@/app/components/Layouts/WebsiteFooter")
);
const DynamicService = dynamic(() => import("./ServicesPage"));
const DynamicOurTeam = dynamic(() => import("./OurTeam"));
const DynamicMap = dynamic(() => import(".//LocationView"));

function Landingpage({ website, daysString }: any) {
  const [scrollY, setScrollY] = useState<any>(0);
  const [showService, setShowService] = useState<boolean>(false);
  const [showTeam, setShowTeam] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  const scrollFunc = () => {
    setScrollY(window.scrollY);
    if (window.scrollY > 300) setShowTeam(true);
    if (window.scrollY > 600) setShowMap(true);
    if (window.scrollY > 800) setShowFooter(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunc);
    setTimeout(() => {
      setShowService(true);
    }, 500);

    return () => {
      window.removeEventListener("scroll", scrollFunc);
    };
  }, []);

  // "openingHoursSpecification": [
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     "closes":  "17:00:00",
  //     "dayOfWeek": "https://schema.org/Sunday",
  //     "opens":  "09:00:00"
  //   },
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     "closes": "17:00:00" ,
  //     "dayOfWeek": "https://schema.org/Saturday",
  //     "opens": "09:00:00"
  //   },
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     "closes":  "17:00:00",
  //     "dayOfWeek": "https://schema.org/Thursday",
  //     "opens": "09:00:00"
  //   },
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     "closes": "17:00:00",
  //     "dayOfWeek": "https://schema.org/Tuesday",
  //     "opens": "09:00:00"
  //   },
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     "closes": "17:00:00",
  //     "dayOfWeek":  "https://schema.org/Friday",
  //     "opens": "09:00:00"
  //   },
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     "closes": "17:00:00",
  //     "dayOfWeek": "https://schema.org/Monday",
  //     "opens": "09:00:00"
  //   },
  //   {
  //     "@type": "OpeningHoursSpecification",
  //     "closes": "17:00:00",
  //     "dayOfWeek":  "https://schema.org/Wednesday",
  //     "opens": "09:00:00"
  //   }
  // ]

  return (
    <>
      <NavbarWebsite website={website} />
      <Script id="application/ld+json" type="application/ld+json">
        {`
     { "@context":  [
    "https://schema.org",
    { "@language": "en-ca" }
  ],
      "@type": "LocalBusiness",
    "openingHours": "${daysString} ${
          moment(website.startTime).format("HH:MMA") +
          "-" +
          moment(website.endTime).format("HH:MMA")
        }",
       "telephone": "+${website.country.phonecode}${website.mobile}",
      "name": "${website.businessName}",
        "description": "${website.subtitle}",
        "isAccessibleForFree": false,
        "paymentAccepted":"Cash, UPI",
        "url":"${process?.env?.NEXT_PUBLIC_BASE_URL + website.slug}",
        "address":  {
    "@id": "_:salon",
    "@type": "PostalAddress",
    "addressCountry": "${website.country.countryCode}",
    "addressLocality": "${website.city}",
    "contactType": "Mailing address",
    "postalCode":  "${website.pincode}",
    "streetAddress": "${website.address}"
  },
  "latitude":"${website.latitude}",
  "longitude":"${website.longitude}",
        "email":"${website.email}",
        "location": { "@id": "_:salon" },
        "hasMap":"${website.maps}",
      "image": "${website.heroImage}",
      "logo":"${website.logo}"
        }
   `}
      </Script>
      <ScreenWrapper>
        <HeroSection website={website} />
        {showService && <DynamicService website={website} />}
        {showTeam && <DynamicOurTeam website={website} />}
        {showMap && <DynamicMap website={website} />}
      </ScreenWrapper>
      {showFooter && <DynamicFooter website={website} />}
      <LinksSidebar website={website} />
    </>
  );
}

export default Landingpage;
