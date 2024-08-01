import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/InputOtp";

const Otp = ({ getOtp, otp }: { otp?: any; getOtp?: any }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-poppins text-base md:text-xl font-semibold mb-4">
          Verify OTP
        </p>
        <InputOTP
          textAlign="center"
          maxLength={6}
          value={otp}
          onChange={(e) => {
            getOtp(e);
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

        {/* <div className="mb-2 mt-4">
          <Button type="submit" onClick={handleSubmit} title="Verify" />
        </div> */}
      </div>
    </div>
  );
};

export default Otp;
