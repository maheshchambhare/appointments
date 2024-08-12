"use client";

import React, { useEffect, useState } from "react";

import AnimatedTabs from "@/app/components/ui/AnimatedTabs";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ServicesPage({ website }: any) {
  const router = useRouter();
  let [activeTab, setActiveTab] = useState(1);

  const [services, setServices] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    apicall({
      path: "category/website",
      getResponse: (res) => {
        let cats: any = [{ id: 1, label: "All" }];

        res.data.categories.map((data: any, index: any) => {
          let obj = {
            id: data.id,
            label: data.name,
          };
          cats.push(obj);
        });

        setCategories(cats);
      },
      getError: (err) => {},
      router,
      method: "post",
      data: { businessUserId: website.businessUserId },
    });
  }, []);

  useEffect(() => {
    setLoader(true);
    apicall({
      path: "service/filter",
      getResponse: (res) => {
        setServices(res.data.services);
        setLoader(false);
      },
      getError: (err) => {},
      router,
      method: "post",
      data: {
        businessUserId: website.businessUserId,
        categoryId: activeTab == 1 ? null : activeTab,
      },
    });
  }, [activeTab]);

  if (categories == null || services == null) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  if (categories.length == 1) {
    return null;
  }

  return (
    <div
      id="services"
      className="h-auto w-full mx-auto  mt-[100px] overflow-hidden min-h-[50vh]  "
    >
      <h2 className="text-foreground font-poppins font-bold text-4xl  ">
        Our Services
      </h2>
      <p className="max-w-[600px] text-sm  md:text-base  text-muted-foreground ">
        Discover the exceptional services we offer at {website.businessName},
        meticulously crafted by our team of experts to meet your every need.
        Explore now and see how we can make a difference for you!
      </p>

      <div className="relative  overflow-x-scroll scrollbar-hide    flex flex-col  mx-auto w-full  items-start justify-start mt-10">
        <AnimatedTabs
          activeTab={activeTab}
          setActTab={(e: any) => {
            setActiveTab(e);
          }}
          tabs={categories}
        />
      </div>
      {loader ? (
        <div className="flex h-[50vh] w-full justify-center items-center ">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 ">
          {services && services.length == 0 ? (
            <p className="text-center mt-10 font-poppins ">
              No services found for this category
            </p>
          ) : (
            services.map((pkg: any, ind: any) => {
              return (
                <Card
                  key={ind}
                  className="col-span-1 overflow-hidden"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="font-poppins text-[16px] md:text-xl font-semibold md:leading-8 ">
                      <p className="text-wrap">{pkg.name}</p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-poppins text-sm text-foreground/50">
                      Gender - {pkg.gender}
                    </p>
                    <p className="font-poppins text-sm text-foreground/50">
                      Duration -{" "}
                      {pkg.duration.hours > 0 && pkg.duration.hours + " hour "}
                      {pkg.duration.minutes > 0 &&
                        pkg.duration.minutes + " min"}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <p className="font-poppins text-[16px] md:text-xl text-foreground ">
                      ₹{pkg.price}/-
                    </p>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default ServicesPage;
