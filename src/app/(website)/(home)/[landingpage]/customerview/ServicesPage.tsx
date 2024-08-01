"use client";
import Button from "@/app/components/ui/Button";
import { ButtonShad } from "@/app/components/ui/Buttons";
import { Phone } from "lucide-react";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import cats from "@/utils/data/categories.json";
import Tab from "@/app/components/ui/Tab";
import AnimatedTabs from "@/app/components/ui/AnimatedTabs";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ServicesPage({ website }: any) {
  const router = useRouter();
  let [activeTab, setActiveTab] = useState(1);

  const [services, setServices] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
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
    apicall({
      path: "service/filter",
      getResponse: (res) => {
        setServices(res.data.services);
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
  return (
    <div
      id="services"
      className="h-auto w-full mx-auto  mt-[100px] overflow-hidden min-h-[50vh]  "
    >
      <h2 className="text-foreground font-poppins font-bold text-4xl ">
        Our Services
      </h2>

      <div className="relative  overflow-x-scroll scrollbar-hide    flex flex-col  mx-auto w-full  items-start justify-start mt-6">
        <AnimatedTabs
          activeTab={activeTab}
          setActTab={(e: any) => {
            setActiveTab(e);
          }}
          tabs={categories}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 ">
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
                  <CardTitle className="font-poppins font-semibold leading-8 ">
                    {pkg.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-poppins text-sm text-foreground/50">
                    Gender - {pkg.gender}
                  </p>
                  <p className="font-poppins text-sm text-foreground/50">
                    Duration -{" "}
                    {pkg.duration.hours > 0 && pkg.duration.hours + " hour "}
                    {pkg.duration.minutes > 0 && pkg.duration.minutes + " min"}
                  </p>
                </CardContent>
                <CardFooter>
                  <p className="font-poppins text-xl text-foreground ">
                    ₹{pkg.price}/-
                  </p>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
