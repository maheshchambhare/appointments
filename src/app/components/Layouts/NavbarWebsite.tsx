"use client";
import React, { useState } from "react";
import Menu from "./Menu";
import {
  Users2Icon,
  UserCircle,
  MenuSquare,
  SunIcon,
  MoonIcon,
  AlignJustify,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessSectionType } from "@/store/slices/commonSlices";
import {
  getBusinessLoggedIn,
  getUserData,
  getUserTypeData,
  setBusinessUserLoggedIn,
  setUserData,
  setUserType,
} from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { apicall } from "@/utils/getdata";
import { Bounce, toast } from "react-toastify";

import Horizontallinks from "./Horizontallinks";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonShad } from "../ui/Buttons";
import Image from "next/image";

interface menuItem {
  name: string;
  route: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function NavbarWebsite({ website }: any) {
  const [loginModal, setLoginModal] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [otpForm, setOtpForm] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);
  const businessUserData = useSelector(getUserData);
  const getUserType = useSelector(getUserTypeData);
  const dispatch = useDispatch();
  const router = useRouter();
  const { setTheme } = useTheme();

  const login = false;

  const menu = [
    {
      name: "About Us",
      route: "home",
      icon: <UserCircle className="text-foreground mr-2" size={18} />,
      onClick: () => {
        setOpenMenu(false);
        window.scrollTo({
          top: 0,

          behavior: "smooth",
        });
      },
    },

    {
      name: "Our Services",
      route: "employee",
      icon: <MenuSquare className="text-foreground mr-2" size={18} />,
      onClick: () => {
        setOpenMenu(false);
        const service: any = document.getElementById("services");

        service.scrollIntoView({ behavior: "smooth" });

        // setTimeout(() => {
        //    dispatch(setUserData("2"));
        // }, 200);
      },
    },

    {
      name: "Our Taem",
      route: "ourteam",
      icon: <Users2Icon className="text-foreground mr-2" size={18} />,
      onClick: () => {
        setOpenMenu(false);
        const team: any = document.getElementById("team");

        team.scrollIntoView({ behavior: "smooth" });

        // setTimeout(() => {
        //    dispatch(setUserData("2"));
        // }, 200);
      },
    },

    // {
    //   name: "Our Team",
    //   route: "logout",
    //   icon: <Users2Icon className="text-foreground mr-2" size={18} />,
    //   onClick: () => {
    //     router.push("/");

    //     apicall({
    //       path: "logout",
    //       getResponse: (res) => {
    //         dispatch(setBusinessUserLoggedIn(false));
    //         dispatch(setUserData(null));
    //         dispatch(setUserType(null));
    //         setOpenMenu(false);

    //         toast("logged out successfully", {
    //           position: "bottom-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //           transition: Bounce,
    //         });
    //       },
    //       getError: (err) => {},
    //       router,
    //       method: "get",
    //     });
    //   },
    // },
  ];

  return (
    <div className="z-20 md:z-10 fixed bg-background/80 backdrop-blur-3xl w-full h-[60px] shadow-sm ">
      <div className="h-full    w-[95%] left-0 right-0  lg:w-[80%] xl:w-[70%]    mx-auto  flex xsm:flex-row md:flex-row justify-between items-center  ">
        <div className=" xsm:w-[80%] md:w-[40%] h-full   flex content-end items-center">
          <div
            onClick={() => {
              if (isBusinessLoggedIn) {
                router.push("/" + businessUserData.slug);
              } else {
                router.push("/");
              }
            }}
            className="mr-10 "
          >
            <h1 className=" w-full font-bave text-foreground uppercase  text-[20px] cursor-pointer  xsm:text-[20px] sm:text-[20px] md:text-[25px]  font-medium  ">
              {website.businessName}
            </h1>
          </div>
        </div>
        <div className="md:flex hidden justify-between items-center">
          <p
            onClick={() => {
              window.scrollTo({
                top: 0,

                behavior: "smooth",
              });
            }}
            className="font-sans text-foreground text-base font-medium mr-4 cursor-pointer"
          >
            About Us
          </p>
          <p
            onClick={() => {
              const service: any = document.getElementById("services");

              service.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-sans text-foreground text-base font-medium mr-4 cursor-pointer"
          >
            Our Services
          </p>
          {/* <p className="font-sans text-foreground text-base font-medium mr-4">
          Availibility
        </p> */}
          <p
            onClick={() => {
              const team: any = document.getElementById("team");

              team.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-sans text-foreground text-base font-medium mr-4 cursor-pointer"
          >
            Our Team
          </p>

          {/* <button
            type="button"
            onClick={() => {}}
            className="inline-flex h-10 mr-4 text-foreground animate-shimmer text-base items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#eee,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Book Now
          </button> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonShad variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </ButtonShad>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center  md:hidden ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonShad variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </ButtonShad>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            onClick={() => {
              setOpenMenu(true);
            }}
            className="flex md:hidden  xsm:w-[50%] md:w-[30%] h-full  items-center justify-end ml-4"
          >
            <p className="cursor-pointer font-mono font-semibold">
              <AlignJustify className="text-foreground" />
            </p>
          </div>
        </div>

        <Menu
          isOpen={openMenu}
          setIsOpen={(e) => {
            setOpenMenu(e);
          }}
        >
          <div className="px-2 sm:px-4 pt-4 ">
            {menu.map((item, ind) => {
              return (
                <div
                  onClick={item.onClick}
                  className="flex cursor-pointer items-center my-4 "
                  key={ind}
                >
                  {item.icon}
                  <p className="font-poppins text-base  text-foreground">
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
          {/* <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex w-full md:w-auto h-12 text-foreground animate-shimmer text-base items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#eee,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Make a Reservation
            </button>
          </div> */}
          <div className="absolute bottom-4 flex flex-col justify-center items-center ">
            <Horizontallinks website={website} />
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default NavbarWebsite;
