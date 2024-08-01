"use client";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";

import Profile from "@/app/components/forms/Profile";
import { apicall } from "@/utils/getdata";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserData } from "@/store/slices/authSlice";
import AddService from "@/app/components/forms/AddService";
import Footer from "@/app/components/Layouts/Footer";
import Services from "./Services";

function Package() {
  const router = useRouter();
  const dispatch = useDispatch();

  const businessUserData = useSelector(getUserData);
  const [serviceList, setServiceList] = useState<any>(null);

  const [getService, setGetService] = useState<any>(null);
  useEffect(() => {
    apicall({
      path: "service/list",
      getResponse: (res) => {
        setServiceList(res.data.services);
        // dispatch(setdisablememberAdd(res.data.disableAdd));
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);

  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      <div className="relative h-auto w-full mb-10  ">
        <ScreenWrapper>
          <Navbar />
          <div className="flex flex-col xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
            {/* <div className="absolute z-[0] bg-black/20 h-full w-full rounded-md backdrop-blur-md blur-xl" /> */}
            <div className="w-[100%] md:w-[50%] ">
              <div className="flex  ml-[-10px] items-center">
                <ChevronLeft
                  onClick={() => {
                    router.push("/" + businessUserData.slug);
                  }}
                  className="text-textPrimary cursor-pointer"
                />
                <p className="text-xl text-textPrimary dark:text-textPrimary">
                  Add Service
                </p>
              </div>
              <AddService
                getService={getService}
                serviceEdit={(e: any) => {
                  setGetService(e);
                }}
                addPackageToList={(e: any) => {
                  if (getService) {
                    let services: any[] = serviceList;
                    const index = services.indexOf(getService);
                    services.splice(index, 1, e);
                    setServiceList([...services]);

                    return;
                  }

                  if (serviceList && (serviceList as any[]).length >= 0) {
                    let services: any[] = serviceList;

                    services.push(e);

                    setServiceList([...services]);
                  }
                }}
              />
            </div>
            <Services
              serviceEdit={(e: any) => {
                setGetService(e);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              services={serviceList}
            />
          </div>
        </ScreenWrapper>
      </div>
      <Footer />
    </main>
  );
}

export default Package;
