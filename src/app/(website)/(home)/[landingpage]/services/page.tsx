"use client";
import Navbar from "@/app/components/Layouts/Navbar";
import ScreenWrapper from "@/app/components/Layouts/ScreenWrapper";
import AddPackage from "@/app/components/forms/AddPackage";
import Profile from "@/app/components/forms/Profile";
import { apicall } from "@/utils/getdata";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Packages from "./packages";
import { getUserData } from "@/store/slices/authSlice";

function Package() {
  const router = useRouter();
  const dispatch = useDispatch();

  const businessUserData = useSelector(getUserData);
  const [packageList, setPackageList] = useState<any>(null);
  useEffect(() => {
    apicall({
      path: "package/list",
      getResponse: (res) => {
        setPackageList(res.data.packages);
        // dispatch(setdisablememberAdd(res.data.disableAdd));
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);

  return (
    <main className="flex bg-background flex-col w-[100vw] min-h-[100vh] ">
      <div className="relative h-auto w-full  ">
        <ScreenWrapper>
          <Navbar />
          <div className="flex xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
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
              <AddPackage
                addPackageToList={(e: any) => {
                  if (packageList && (packageList as any[]).length >= 0) {
                    let packageListData: any[] = packageList;

                    packageListData.push(e);
                    setPackageList([...packageListData]);
                  }
                }}
              />
            </div>
            <Packages packages={packageList} />
          </div>
        </ScreenWrapper>
      </div>
    </main>
  );
}

export default Package;
