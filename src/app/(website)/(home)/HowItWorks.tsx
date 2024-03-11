"use client";
import React from "react";
import features from "@/utils/data/features.json";
import Button from "@/app/components/ui/Button";
import { Meteors } from "@/app/components/ui/meteors";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";

function HowItWorks() {
  return (
    <div className="h-full w-full  ">
      <h4
        className="xl:w-[70%]  mx-auto mb-10 text-textPrimary text-center  font-mont font-bold 
          xsm:text-[25px] xsm:leading-[30px]
        md:text-[35px] md:leading-[40px]
        lg:text-[45px] lg:leading-[50px]
        xl:text-[50px] xl:leading-[65px]
        2xl:text-[72px] 2xl:leading-[80px]
        "
      >
        Not convinced yet ? Take a look on this.
      </h4>

      <div className="grid xsm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((fetaure, ind) => {
          return (
            <div key={ind}>
              <CardContainer className="w-full h-full inter-var cursor-pointer ">
                <CardBody className="bg-gray-50  min-h-[200px] h-full  group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem]  rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="20"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    <h3 className="mb-2 xsm:text-base md:text-lg lg:text-xl text-textprimary font-semibold font-poppins">
                      {fetaure.name}
                    </h3>
                  </CardItem>
                  <CardItem
                    translateZ="30"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    <p className="xsm:text-sm md:text-base lg:text-md font-mont text-gray-400">
                      {fetaure.description.length > 150
                        ? fetaure.description.substring(0, 150) + "...Read More"
                        : fetaure.description}
                    </p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          );
        })}
      </div>
      <div className="mt-6 mb-6 max-w-max mx-auto">
        <Button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          title="Subscribe"
        />
      </div>
    </div>
  );
}

export default HowItWorks;
