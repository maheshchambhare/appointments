"use client";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import NavbarWebsite from "@/app/components/Layouts/NavbarWebsite";
import HeroSection from "./HeroSection";
import LinksSidebar from "@/app/components/Layouts/LinksSidebar";
import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import("@/app/components/Layouts/Footer"));
const DynamicService = dynamic(() => import("./ServicesPage"));
const DynamicOurTeam = dynamic(() => import("./OurTeam"));

function Landingpage({ website }: any) {
  const [scrollY, setScrollY] = useState<any>(0);
  const [showService, setShowService] = useState<boolean>(false);
  const [showTeam, setShowTeam] = useState<boolean>(false);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  const scrollFunc = () => {
    setScrollY(window.scrollY);
    if (window.scrollY > 300) setShowTeam(true);
    if (window.scrollY > 600) setShowFooter(true);
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
  return (
    <>
      <NavbarWebsite website={website} />
      <ScreenWrapper>
        <HeroSection website={website} />
        {showService && <DynamicService website={website} />}

        {showTeam && <DynamicOurTeam website={website} />}
      </ScreenWrapper>
      {showFooter && <DynamicFooter website={website} />}
      <LinksSidebar website={website} />
    </>
  );
}

export default Landingpage;
