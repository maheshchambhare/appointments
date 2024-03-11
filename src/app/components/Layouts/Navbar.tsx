"use client";
import React, { useState } from "react";
import ModalLayout from "../ModalLayout";
import Login from "../forms/Login";
import ResetPassword from "../forms/ResetPassword";
import Otp from "../forms/Otp";

function Navbar() {
  const [loginModal, setLoginModal] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [otpForm, setOtpForm] = useState(false);
  return (
    <div className="w-[95%] z-10  mMax:w-[80%] lMax:w-[70%] mt-4 mx-auto h-[60px]  flex xsm:flex-row md:flex-row justify-between items-center  ">
      <div className="xsm:w-[40%] md:w-[50%] h-full  ">
        <h1 className=" w-full font-mont  md:text-left xsm:text-[20px] md:text-[30px] text-[30px] text-textPrimary font-bold items-center">
          APPOINTIFY
        </h1>
      </div>
      <div
        onClick={() => {
          setLoginModal(true);
        }}
        className="flex  xsm:w-[50%] md:w-[30%] h-full justify-end"
      >
        <p className="cursor-pointer font-mono font-semibold">Login</p>
      </div>

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
            />
          )}
        </ModalLayout>
      )}
    </div>
  );
}

export default Navbar;
