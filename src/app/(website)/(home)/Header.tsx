"use client";
import ModalLayout from "@/app/components/ModalLayout";
import Otp from "@/app/components/forms/Otp";
import SignUp from "@/app/components/forms/SignUp";
import Button from "@/app/components/ui/Button";
import { Spotlight } from "@/app/components/ui/Spotlight";
import homeData from "@/utils/data/homepage.json";
import { ChevronsDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [signupModal, setSignupModal] = useState(false);
  const [otpForm, setOtpForm] = useState(false);

  return (
    <div className="h-[80vh] w-full    relative flex  items-center justify-between dark">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[80%] xl:w-[80%] 2xl:w-[60%] mx-auto ">
        <Spotlight
          className="-top-20 -left-20 md:left-60 md:-top-10"
          fill="white"
        />

        <h1
          className="text-textPrimary text-center dark:text-white  font-mont font-bold 
          xsm:text-[25px] xsm:leading-[30px]
        md:text-[35px] md:leading-[40px]
        lg:text-[45px] lg:leading-[50px]
        xl:text-[70px] xl:leading-[75px]
        2xl:text-[72px] 2xl:leading-[80px]
        "
        >
          {homeData.title}
        </h1>

        <p
          className="text-textSecondary font-poppins font-normal  mt-2 dark:text-textSecondary
          text-center
          xsm:text-[10px] xsm:leading-[15px]
        sm:text-[12px] sm:leading-[20px]
        md:text-[15px] md:leading-[23px]
        lg:text-[20px] lg:leading-[28px]
        xl:text-xl xl:leading-8
        2xl:text-xl 2xl:leading-8 

        "
        >
          {homeData.description}
        </p>

        <div className="relative w-full xsm:flex-col lg:flex-row   flex justify-center items-center mt-4 mx-auto mMax:ml-0 dark:text-white">
          <Button
            onClick={async () => {
              setSignupModal(true);
            }}
            title="Business Signup"
          />
          {/* <p className="mx-4">Or</p>
          <Button
            onClick={async () => {
              setSignupModal(true);
            }}
            title="User Signup"
          /> */}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center">
        <ChevronsDown className="animate-updown transition-all" size={35} />
      </div>
      {signupModal && (
        <ModalLayout
          isOpen={signupModal}
          modalTitle={otpForm ? "Verify Otp" : "Sign Up"}
          modalWidth="30%"
          setIsOpen={(e) => {
            setSignupModal(e);
            setOtpForm(false);
          }}
        >
          {otpForm ? (
            <Otp />
          ) : (
            <SignUp
              setotpform={(e) => {
                setOtpForm(e);
              }}
            />
          )}
        </ModalLayout>
      )}
    </div>
  );
};

export default Header;
