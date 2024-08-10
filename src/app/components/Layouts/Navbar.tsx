"use client";
import React, { useState } from "react";
import ModalLayout from "../ModalLayout";
import Login from "../forms/Login";
import ResetPassword from "../forms/ResetPassword";
import Otp from "../forms/Otp";
import Menu from "./Menu";
import {
  User,
  Users2Icon,
  LogOut,
  Blocks,
  SunIcon,
  MoonIcon,
  Globe,
  ListPlus,
  LayoutDashboard,
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
import { AlignJustify, SquareKanban } from "lucide-react";
import Cookies from "js-cookie";
import { apicall } from "@/utils/getdata";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonShad } from "../ui/Buttons";
import Link from "next/link";

interface menuItem {
  name: string;
  route: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function Navbar() {
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
    // {
    //   name: getUserType == 1 ? "Appointments" : "Appointments",
    //   route: "home",
    //   icon: <SquareKanban className="text-textPrimary" size={18} />,
    //   onClick: () => {
    //     router.push("/" + businessUserData.slug);
    //     dispatch(setBusinessSectionType("1"));
    //   },
    // },
    getUserType == 0 && {
      name: "Dashboard",
      route: "/dashboard",
      icon: <LayoutDashboard className="text-textPrimary" size={18} />,
      onClick: () => {
        router.push("/dashboard");
      },
    },
    getUserType == 0 && {
      name: "Profile",
      route: "/dashboard/profile",
      icon: <User className="text-textPrimary" size={18} />,
      onClick: () => {
        router.push("/dashboard/profile");
      },
    },
    getUserType == 0 && {
      name: "Website",
      route: "/dashboard/website",
      icon: <Globe className="text-textPrimary" size={18} />,
      onClick: () => {
        router.push("/dashboard/website");
      },
    },
    // getUserType == 0 && {
    //   name: "Generate Slots",
    //   route: "slots",
    //   icon: <CalendarPlus className="text-textPrimary" size={18} />,
    //   onClick: () => {
    //     setOpenMenu(false);
    //     router.push("/" + businessUserData.slug);

    //     setTimeout(() => {
    //       dispatch(setBusinessSectionType("2"));
    //     }, 200);
    //   },
    // },
    getUserType == 0 && {
      name: "Employees",
      route: "/dashboard/employee",
      icon: <Users2Icon className="text-textPrimary" size={18} />,
      onClick: () => {
        setOpenMenu(false);
        router.push("/dashboard/employee");

        // setTimeout(() => {
        //    dispatch(setUserData("2"));
        // }, 200);
      },
    },
    getUserType == 0 && {
      name: "Categories",
      route: "/dashboard/category",
      icon: <ListPlus className="text-textPrimary" size={18} />,
      onClick: () => {
        setOpenMenu(false);
        router.push("/dashboard/category");

        // setTimeout(() => {
        //    dispatch(setUserData("2"));
        // }, 200);
      },
    },
    getUserType == 0 && {
      name: "Services",
      route: "/dashboard/services",
      icon: <Blocks className="text-textPrimary" size={18} />,
      onClick: () => {
        setOpenMenu(false);
        router.push("/dashboard/services");

        // setTimeout(() => {
        //    dispatch(setUserData("2"));
        // }, 200);
      },
    },
    {
      name: "Logout",
      route: "logout",
      icon: <LogOut className="text-textPrimary" size={18} />,
      onClick: () => {
        router.push("/");

        apicall({
          path: "logout",
          getResponse: (res) => {
            dispatch(setBusinessUserLoggedIn(false));
            dispatch(setUserData(null));
            dispatch(setUserType(null));
            setOpenMenu(false);

            toast("logged out successfully", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          },
          getError: (err) => {},
          router,
          method: "get",
        });
      },
    },
  ];

  return (
    <div className="w-[100%]  z-10  mMax:w-[80%] lMax:w-[70%] mt-4 mx-auto  flex xsm:flex-row md:flex-row justify-between items-center  ">
      <div className=" xsm:w-[40%] md:w-[50%] h-full  flex items-center">
        <div
          onClick={() => {
            if (!isBusinessLoggedIn) {
              router.push("/" + businessUserData.slug);
            } else {
              router.push("/dashboard");
            }
          }}
          className="mr-10 "
        >
          <h1 className=" w-full font-bave  cursor-pointer xsm:text-[20px] md:text-[25px] text-[25px] text-foreround font-medium  ">
            APPOINTIFY
          </h1>
        </div>
      </div>

      {isBusinessLoggedIn ? (
        <div className="flex items-center   ">
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
            className="flex ml-4 xsm:w-[50%] md:w-[30%] h-full justify-end"
          >
            <p className="cursor-pointer font-mono font-semibold">
              <AlignJustify className="text-textPrimary" />
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center  ">
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
              setLoginModal(true);
            }}
            className="flex   h-full justify-end ml-4"
          >
            <p className="cursor-pointer font-mono font-semibold text-textPrimary">
              Login
            </p>
          </div>
        </div>
      )}

      {loginModal && (
        <ModalLayout
          isOpen={loginModal}
          modalTitle={
            resetForm
              ? otpForm
                ? "Verify Otp"
                : "Reset your password"
              : "Business Login"
          }
          modalWidth="30%"
          setIsOpen={(e) => {
            setLoginModal(e);
            setResetForm(false);
            setOtpForm(false);
          }}
        >
          {resetForm ? (
            otpForm ? (
              <Otp />
            ) : (
              <ResetPassword
                resetForm={(e) => {
                  setResetForm(e);
                }}
                setotpform={(e) => {
                  setOtpForm(e);
                }}
              />
            )
          ) : (
            <Login
              resetForm={(e) => {
                setResetForm(e);
              }}
              setIsOpen={(e) => {
                setLoginModal(e);
                setResetForm(false);
                setOtpForm(false);
              }}
            />
          )}
        </ModalLayout>
      )}
      <Menu
        isOpen={openMenu}
        setIsOpen={(e) => {
          setOpenMenu(e);
        }}
      >
        <div className="px-2 sm:px-4 py-4">
          {menu.map((item, ind) => {
            return (
              item &&
              (item.route == "logout" ? (
                <div
                  onClick={item.onClick}
                  className="flex cursor-pointer items-center my-4 "
                  key={ind}
                >
                  {item.icon}
                  <p className="font-poppins text-base ml-2 text-textPrimary">
                    {item.name}
                  </p>
                </div>
              ) : (
                <Link
                  href={item.route}
                  className="flex cursor-pointer items-center my-4 "
                  key={ind}
                >
                  {item.icon}
                  <p className="font-poppins text-base ml-2 text-textPrimary">
                    {item.name}
                  </p>
                </Link>
              ))
            );
          })}
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
