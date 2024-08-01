"use client";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import MoreSection from "./MoreSection";
import Loader from "@/app/components/ui/Loader";

function PageSection() {
  const [businessUser, setBusinessUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    apicall({
      path: "slug",
      getResponse: (res) => {
        setBusinessUser(res.data.data);
      },
      getError: (err) => {},
      router,
      method: "post",
      data: {
        page: "0",
      },
    });
  }, []);

  if (businessUser == null) {
    return <Loader />;
  }

  return (
    <div className="relative h-auto w-full  ">
      <ScreenWrapper>
        <Navbar />
        <Header
          title={businessUser.name}
          about={businessUser.about}
          address={businessUser.address}
        />

        {/* <MoreSection businessData={businessUser} /> */}
      </ScreenWrapper>
    </div>
  );
}

export default PageSection;
