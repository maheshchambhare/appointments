"use client";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Appointment from "@/app/components/forms/Appointment";
import Loader from "@/app/components/ui/Loader";

function PageSection({ landingpage }: { landingpage: string }) {
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
        slug: landingpage,
        page: "1",
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
        {/* <Header
          title={businessUser.name}
          about={businessUser.about}
          address={businessUser.address}
        /> */}
        <Appointment title={businessUser.name} businessData={businessUser} />
      </ScreenWrapper>
    </div>
  );
}

export default PageSection;
