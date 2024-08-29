// import Appointment from "@/app/components/forms/Appointment";
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalTrigger,
// } from "@/app/components/ui/animated-modal";
import Horizontallinks from "@/app/components/Layouts/Horizontallinks";
import Button from "@/app/components/ui/Button";
import { ButtonShad } from "@/app/components/ui/Buttons";
import {
  FacebookIcon,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import moment from "moment";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeroSection({ website }: any) {
  const links = [
    {
      name: "phone",
      link: "https://facebook.com",
      Icon: <Phone size={25} className="text-foreground text-sm" />,
    },
    {
      name: "facebook",
      link: "https://facebook.com",
      Icon: <MessageCircle size={25} className="text-foreground text-sm" />,
    },
    {
      name: "facebook",
      link: "https://facebook.com",
      Icon: <MapPin size={25} className="text-foreground text-sm" />,
    },
    {
      name: "facebook",
      link: "https://facebook.com",
      Icon: <Instagram size={25} className="text-foreground text-sm" />,
    },
    {
      name: "facebook",
      link: "https://facebook.com",
      Icon: <FacebookIcon size={25} className="text-foreground text-sm" />,
    },
  ];
  return (
    <div id="about" className="h-full w-full mx-auto  mt-[100px]  md:mt-[60px]">
      <div className="flex w-full relative flex-col md:flex-row justify-between h-full md:h-[60vh] items-center">
        <div className="w-[100%] flex flex-col md:w-[60%] z-4  justify-center h-full">
          <h1 className="text-foreground  text-[40px] leading-[40px] md:text-[60px] md:leading-[55px] lg:text-[70px] lg:leading-[65px] font-tank">
            {/* Discover the Ultimate Salon Experience with Maverick */}
            {website.title}
          </h1>
          <p className="text-foreground text-base md:text-xl mt-2 max-w-[500px] ">
            {/* Step into a world of style and relaxation. Book your appointment
            today and let our expert team bring out the best in you. */}
            {website.subtitle}
          </p>
          <div className="flex flex-col md:flex-row mt-4 w-full  items-center">
            {/* <Modal>
              <ModalTrigger className="w-full md:w-auto  p-0">
                <Button
                  type="button"
                  onClick={() => {}}
                  title={"Make a Reservation"}
                />
              </ModalTrigger>
              <ModalBody>
                <ModalContent className="overflow-y-scroll appointment">
                  <Appointment
                    title={businessData?.name}
                    businessData={businessData}
                  />
                </ModalContent>
              </ModalBody>
            </Modal> */}

            <Button
              type="button"
              onClick={() => {
                window.open(
                  `https://wa.me/+${website.country.phonecode}${website.whatsapp}`,
                  "_blank"
                );
              }}
              title={"Enquire now"}
            />

            <ButtonShad
              onClick={() => {
                const service: any = document.getElementById("services");

                service.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex w-full md:w-auto ml-0 md:ml-4 h-12 mt-4 md:mt-0 text-foreground   text-base items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#eee,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Our Services
            </ButtonShad>

            <div className="md:hidden">
              <Horizontallinks website={website} />
            </div>
          </div>
        </div>
        <div className=" pattern flex  border-0 border-foreground rounded-lg w-[80%] md:w-[40%] mt-10 md:mt-0  relative  z-0 ">
          <Image
            height={600}
            width={400}
            className="w-full h-full   aspect-square object-cover  shadow-lg rotate-12 border-foreground  border-0  rounded-lg"
            alt="Salon hero image"
            src={website.heroImage}
          />
        </div>
      </div>
      <div className="flex w-full relative flex-col md:flex-row max-h-max mb-20  mt-10 md:mt-20 ">
        <div className="flex flex-col  items-center w-full md:w-[33%]  md:border-r-2 border-foreground ">
          <p className="text-foreground font-bave text-xl ">Contact Us</p>
          <Link
            href={`tel:${website.country.phonecode + website.mobile}`}
            className="text-foreground text-center font-poppins text-base mt-2"
          >
            +{website.country.phonecode + " " + website.mobile}
          </Link>
          <Link
            href={`mailto:${website.email}`}
            className="text-foreground text-center font-poppins text-base "
          >
            {website?.email}
          </Link>
        </div>
        <div className="flex flex-col mt-6 md:mt-0  items-center w-full md:w-[33%] md:border-r-2 border-foreground ">
          <p className="text-foreground text-center font-bave text-xl ">
            Open Hours
          </p>

          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-wrap">
              {website.weekdays.map((d: any, i: any) => {
                return (
                  d.isActive && (
                    <p
                      key={i}
                      className="text-foreground text-center font-poppins text-base mt-2 mx-2"
                    >
                      {d.name.substring(0, 3)}
                    </p>
                  )
                );
              })}
            </div>
            <p className="text-foreground text-center font-poppins text-base ">
              {"( " +
                moment(website.startTime).format("hh:mm A") +
                " - " +
                moment(website.endTime).format("hh:mm A") +
                " )"}
            </p>
            <div className="flex flex-wrap">
              {website.weekdays.map((d: any, i: any) => {
                return (
                  !d.isActive && (
                    <p
                      key={i}
                      className="text-foreground text-center font-poppins text-base mt-2 mx-2"
                    >
                      {d.name.substring(0, 3)}
                    </p>
                  )
                );
              })}
            </div>
            <p className="text-foreground text-center font-poppins text-base  mx-2">
              Closed
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-6 md:mt-0  items-center w-full md:w-[33%]  ">
          <p className="text-foreground text-center font-bave text-xl ">
            Address
          </p>
          <p className="text-foreground text-center font-poppins text-base mt-2 px-4">
            {website.address +
              " " +
              website.city +
              ", " +
              website.state +
              ", " +
              website.country.value +
              ", " +
              website.pincode}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
