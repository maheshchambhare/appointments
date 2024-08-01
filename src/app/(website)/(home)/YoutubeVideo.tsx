"use client";
import React from "react";
import features from "@/utils/data/features.json";
import Button from "@/app/components/ui/Button";
import { Meteors } from "@/app/components/ui/meteors";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";

function YoutubeVideo() {
  return (
    <div className="h-full w-full mt-40 ">
      <h4
        className="xl:w-[70%]  mx-auto mb-10 text-textPrimary text-center  font-mont font-bold 
          xsm:text-[25px] xsm:leading-[30px]
        md:text-[35px] md:leading-[40px]
        lg:text-[45px] lg:leading-[50px]
        xl:text-[50px] xl:leading-[65px]
        2xl:text-[72px] 2xl:leading-[80px]
        "
      >
        How It Works ? watch this demo to know more
      </h4>

      <div className="flex justify-center items-center mb-20">
        <iframe
          className="max-w-[520px] min-h-[320px] w-full h-full object-cover"
          src="https://www.youtube.com/embed/t4osQD-PDHo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "15px", overflow: "hidden" }}
        />
      </div>
    </div>
  );
}

export default YoutubeVideo;
