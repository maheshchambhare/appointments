"use client";
import ModalLayout from "@/app/components/ModalLayout";
import Otp from "@/app/components/forms/Otp";
import SignUp from "@/app/components/forms/SignUp";
import Button from "@/app/components/ui/Button";
import { Spotlight } from "@/app/components/ui/Spotlight";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/app/components/ui/animated-modal";
import { getBusinessLoggedIn, getUserData } from "@/store/slices/authSlice";
import { BASE_URL } from "@/utils/constants";
import homeData from "@/utils/data/homepage.json";
import { ChevronsDown } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const [signupModal, setSignupModal] = useState(false);
  const [otpForm, setOtpForm] = useState(false);

  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);
  const businessUserData = useSelector(getUserData);

  return (
    <div className="h-[80vh] w-full    relative flex  items-center justify-between ">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[80%] xl:w-[80%] 2xl:w-[60%] mx-auto ">
        <Spotlight
          className="-top-20 -left-20 md:left-60 md:-top-10"
          fill="hsl(var(--foreground))"
        />

        <h1
          className=" text-center text-foreground   font-mont font-bold 
          text-[25px] xsm:leading-[30px]
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
          className="text-textSecondary font-poppins font-normal  mt-2 
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
        {!isBusinessLoggedIn && (
          <div className="relative w-full xsm:flex-col lg:flex-row   flex justify-center items-center mt-4 mx-auto mMax:ml-0 ">
            <Button
              onClick={async () => {
                if (isBusinessLoggedIn) {
                  window.open(BASE_URL + businessUserData.slug, "_blank");
                  return;
                }

                setSignupModal(true);
              }}
              title={"Business Signup"}
            />
            {/* <p className="mx-4">Or</p> */}
            {/* <Button
            onClick={async () => {
              setSignupModal(true);
            }}
            title="User Signup"
          /> */}
          </div>
        )}
      </div>

      <div
        onClick={() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }}
        className="absolute bottom-0 left-0 right-0 w-full flex justify-center"
      >
        <ChevronsDown
          className="animate-updown transition-all cursor-pointer text-textPrimary"
          size={35}
        />
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
          {/* {otpForm ? (
            <Otp
              formType="1"
              setIsOpen={(e) => {
                setSignupModal(e);
                setOtpForm(false);
              }}
            />
          ) : ( */}
          <SignUp
            setotpform={(e) => {
              setOtpForm(e);
            }}
          />
          {/* )} */}
        </ModalLayout>
      )}
    </div>
  );
};

export default Header;
