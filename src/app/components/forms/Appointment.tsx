"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apicall } from "@/utils/getdata";
import { setBusinessUserLoggedIn, setUserData } from "@/store/slices/authSlice";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/InputOtp";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGrp";
import { Label } from "../ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Buttons } from "../ui/Buttons";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

import moment from "moment";
import Calender from "../ui/Calender";

const Appointment = () => {
  const [formType, setFormType] = useState("1");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [showCal, setShowCal] = useState(false);
  const [showDobCal, setShowDobCal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showCalenar, setShowCalenar] = useState(false);
  const [calenderClick, setCalenderClick] = useState(null);
  const daysOfWeek = [
    { id: 0, days: "S", name: "Sunday", isActive: false },
    { id: 1, days: "M", name: "Monday", isActive: true },
    { id: 2, days: "T", name: "Tuesday", isActive: true },
    { id: 3, days: "W", name: "Wednesday", isActive: true },
    { id: 4, days: "T", name: "Thursday", isActive: false },
    { id: 5, days: "F", name: "Friday", isActive: false },
    { id: 6, days: "S", name: "Saturday", isActive: false },
  ];

  const mobileInitialVal = {
    mobile: "",
  };

  const finalForm = {
    name: "",
    sex: "",
    date: "10/12/2024",
    slot: "",
  };

  const mobileErr = (values: any) => {
    const errors: any = {};

    if (!values.mobile) {
      errors.mobile = "Required";
    } else if (values.mobile.length != 10) {
      errors.mobile = "Invalid mobile number";
    }

    if (formType == "1") {
      if (otp == "") {
        errors.otp = "Required";
      } else if (otp.length < 5) {
        errors.otp = "Otp must be 6 char long";
      }
    }

    return errors;
  };

  const appointmentErr = (values: any) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.date) {
      errors.date = "Required";
    }

    if (!values.slot) {
      errors.slot = "Required";
    }

    return errors;
  };

  return (
    <div className="max-w-[300px]">
      <Formik
        initialValues={formType == "0" ? mobileInitialVal : finalForm}
        validate={(values) => {
          if (formType == "0") {
            mobileErr(values);
          } else {
            appointmentErr(values);
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          // apicall({
          //   path: "login",
          //   getResponse: (res) => {
          //     Cookies.set("businessUser", JSON.stringify({ ...res.data }));
          //     dispatch(setBusinessUserLoggedIn(true));
          //     dispatch(setUserData(res.data));
          //     setIsOpen(false);
          //   },
          //   getError: (err) => {},
          //   router,
          //   method: "post",
          //   data: {
          //     mobile: values.mobile,
          //     password: values.password,
          //   },
          // });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            {formType == "0" && (
              <>
                <div className="mt-4">
                  <CustomInput
                    type="number"
                    name="mobile"
                    label="Mobile"
                    id="mobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    error={errors.mobile}
                    touched={touched.mobile}
                  />
                </div>
                {showOtpField && (
                  <div className="mt-4">
                    <InputOTP
                      textAlign="center"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e);
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
                  </div>
                )}
              </>
            )}

            {formType == "1" && (
              <div>
                <div className="mt-4">
                  <CustomInput
                    type="text"
                    name="name"
                    label="Name"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                  />
                </div>
                <div className="mt-4">
                  <p className="mb-2 font-poppins text-white">Sex</p>
                  <RadioGroup
                    onValueChange={(e) => (values.sex = e)}
                    className="flex flex-wrap"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex ml-4 items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex ml-4 items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-4 ">
                  <p className="mb-2 font-poppins text-white">
                    Pick a Appointment Date
                  </p>

                  <Buttons
                    onClick={() => {
                      setShowCalenar(!showCalenar);
                    }}
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !values.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {values.date ? (
                      <p>{values.date}</p>
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Buttons>

                  {showCalenar && (
                    <div
                      id="calendar"
                      className="w-[300px] z-10  bg-white p-2 absolute rounded-lg mt-1"
                    >
                      <Calender
                        selectedDays={null}
                        daysOfWeek={daysOfWeek}
                        disDays={["24/03/2024"]}
                        showCalendar={(e) => {
                          setShowCalenar(e);
                        }}
                        setSelDays={(e) => {
                          values.date = e;
                          console.log(e);
                          setShowCalenar(false);
                        }}
                        startDate={new Date()}
                        endDate={moment(new Date(), "YYYY-MM-DD")
                          .add(2, "month")
                          .endOf("month")
                          .format("YYYY-MM-DD")}
                        onDateClick={(e) => {
                          console.log(e, "ON DATE CLICKED");
                        }}
                        colors={{
                          text: "#131313",
                          background: "#ffff",
                          activeTextColor: "black",
                          disabledTextColor: "gray",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4 ">
                  <p className="mb-2 font-poppins text-white">
                    Pick a Appointment Slot
                  </p>
                </div>
              </div>
            )}

            <div className="mb-2 mt-6">
              <Button
                type="submit"
                onClick={handleSubmit}
                title={
                  formType == "0"
                    ? showOtpField
                      ? "Verify"
                      : "Send Otp"
                    : "Add Appointment"
                }
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Appointment;
