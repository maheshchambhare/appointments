import React, { useState } from "react";
import Button from "../ui/Button";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/InputOtp";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setBusinessUserLoggedIn, setUserData } from "@/store/slices/authSlice";

const Otp = ({
  setIsOpen,
  formType,
}: {
  setIsOpen: (val: boolean) => void;
  formType: string;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [otpData, setOtpData] = useState("");

  const handleSubmit = () => {
    apicall({
      path: formType == "1" ? "signup/verify" : "verifyotp",
      getResponse: (res) => {
        if (formType == "1") {
          Cookies.set("businessUser", { ...res.data });
          dispatch(setBusinessUserLoggedIn(true));
          dispatch(setUserData(res.data));
        }

        setIsOpen(false);
      },
      getError: (err) => {},
      router,
      method: "post",
      data: { otp: otpData },
    });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <InputOTP
          textAlign="center"
          maxLength={6}
          value={otpData}
          onChange={(e) => {
            setOtpData(e);
          }}
          render={({ slots }) => (
            <>
              <InputOTPGroup>
                {slots.slice(0, 3).map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}{" "}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {slots.slice(3).map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
            </>
          )}
        />

        <div className="mb-2 mt-4">
          <Button type="submit" onClick={handleSubmit} title="Verify" />
        </div>
      </div>
    </div>
  );
};

export default Otp;
