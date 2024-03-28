"use client";
import React, { useState } from "react";
import ModalLayout from "../ModalLayout";
import Login from "../forms/Login";
import ResetPassword from "../forms/ResetPassword";
import Otp from "../forms/Otp";
import Menu from "./Menu";
import { User, CalendarPlus, UsersRound, Users2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessSectionType } from "@/store/slices/commonSlices";
import {
  getBusinessLoggedIn,
  getUserData,
  setUserData,
} from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { AlignJustify, SquareKanban } from "lucide-react";

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
  const dispatch = useDispatch();
  const router = useRouter();

  const login = false;

  const menu = [
    {
      name: "All Tickets",
      route: "home",
      icon: <SquareKanban size={18} />,
      onClick: () => {
        router.push("/" + businessUserData.slug);
      },
    },
    {
      name: "Profile",
      route: "profile",
      icon: <User size={18} />,
      onClick: () => {
        router.push("/" + businessUserData.slug + "/profile");
      },
    },
    {
      name: "Generate Slots",
      route: "slots",
      icon: <CalendarPlus size={18} />,
      onClick: () => {
        setOpenMenu(false);
        router.push(businessUserData.slug);

        setTimeout(() => {
          dispatch(setBusinessSectionType("2"));
        }, 200);
      },
    },
    {
      name: "Members",
      route: "members",
      icon: <Users2Icon size={18} />,
      onClick: () => {
        setOpenMenu(false);
        router.push("/" + businessUserData.slug + "/members");

        // setTimeout(() => {
        //    dispatch(setUserData("2"));
        // }, 200);
      },
    },
  ];

  return (
    <div className="w-[100%] z-10  mMax:w-[80%] lMax:w-[70%] mt-4 mx-auto h-[60px]  flex xsm:flex-row md:flex-row justify-between items-center  ">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="xsm:w-[40%] md:w-[50%] h-full  "
      >
        <h1 className=" w-full font-mont  cursor-pointer xsm:text-[20px] md:text-[30px] text-[30px] text-textPrimary font-bold ">
          APPOINTIFY
        </h1>
      </div>
      {isBusinessLoggedIn ? (
        <div
          onClick={() => {
            setOpenMenu(true);
          }}
          className="flex  xsm:w-[50%] md:w-[30%] h-full justify-end"
        >
          <p className="cursor-pointer font-mono font-semibold">
            <AlignJustify />
          </p>
        </div>
      ) : (
        <div
          onClick={() => {
            setLoginModal(true);
          }}
          className="flex  xsm:w-[50%] md:w-[30%] h-full justify-end"
        >
          <p className="cursor-pointer font-mono font-semibold">Login</p>
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
              <Otp formType="2" />
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
        <div className="px-2 sm:px-4 py-10">
          {menu.map((item, ind) => {
            return (
              <div
                onClick={item.onClick}
                className="flex cursor-pointer items-center my-4 "
                key={ind}
              >
                {item.icon}
                <p className="font-poppins text-base ml-2">{item.name}</p>
              </div>
            );
          })}
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
