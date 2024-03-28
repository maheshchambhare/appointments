"use client";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";

import { useRouter } from "next/navigation";
import { apicall } from "@/utils/getdata";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/InputOtp";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGrp";
import { Label } from "../ui/Label";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Buttons } from "../ui/Buttons";
import { cn } from "@/utils/cn";

import moment from "moment";
import Calender from "../ui/Calender";
import MultiSelectComp from "../MultiSelectComp";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointment = ({ businessData }: { businessData: any }) => {
  const [formType, setFormType] = useState("1");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const router = useRouter();
  const [showCalenar, setShowCalenar] = useState(false);
  const [slotsArr, setSlotsArr] = useState<any[]>([]);
  const [membersArr, setMembersArr] = useState<any[]>([]);
  const [membersArrErr, setMembersArrErr] = useState<any>();
  const [slotErr, setSlotErr] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const [loader, setLoader] = useState<boolean>(false);

  const businessUserData = businessData;

  useEffect(() => {
    if (businessUserData.members) {
      let people: any[] = [];
      businessUserData.members.map((member: any, i: number) => {
        let obj = {
          label: member.name,
          value: member.id,
        };
        people.push(obj);
      });
      setMembersArr(people);
    }
  }, [businessUserData]);

  const daysOfWeek = businessData.weekdays;

  const finalForm = {
    name: "",
    mobile: "",
    sex: "",
    date: "",
    slot: null,
    memberId: null,
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

  const getAllSlots = ({ date, member }: { date: string; member: string }) => {
    apicall({
      path: "getslots",
      getResponse: (res) => {
        const disSlots = res.data.slots;

        if (businessUserData.slots) {
          const filteredSlots = businessUserData.slots.filter((slot: any) => {
            // Check if the slot exists in disSlots array
            return !disSlots.some((disSlot: any) => {
              // You need to define the condition for matching slots
              // For example, if the slots are objects and you want to match based on startTime and endTime
              return (
                slot.startTime === disSlot.slot.startTime &&
                slot.endTime === disSlot.slot.endTime
              );
            });
          });

          let slots: any[] = [];
          filteredSlots.map((d: any, i: number) => {
            let obj = {
              label: `${d.startTime} - ${d.endTime}`,
              value: `${d.startTime} - ${d.endTime}`,
              ...d,
            };
            slots.push(obj);
          });

          setSlotsArr(slots);
        }
      },
      getError: (err) => {},
      router,
      method: "post",
      data: { date, member },
    });
  };

  if (loader) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-[300px] mx-auto">
      <Formik
        initialValues={finalForm}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.mobile) {
            errors.mobile = "Required";
          } else if (JSON.stringify(values.mobile).length != 10) {
            errors.mobile = "Invalid mobile number";
          }

          if (!values.sex) {
            errors.sex = "Required";
          }

          if (values.memberId == null) {
            setMembersArrErr("Please select member");
            errors.memberId = "Please select member";
          }

          if (!values.date) {
            errors.date = "Required";
          }

          if (!values.slot) {
            errors.slot =
              "Select slot,try changing date or member if slots are not available";
            setSlotErr(
              "Select slot,try changing date or member if slots are not available"
            );
            //  setSlotsArr
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          if (showOtpField) {
            setLoader(true);
          }

          apicall({
            path: showOtpField ? "addappointments/verify" : "addappointments",
            getResponse: (res) => {
              if (res.status == 201) {
                setShowOtpField(true);
                toast("💬 Verify OTP", {
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
                // resetForm();
              } else {
                setShowOtpField(false);
                setSelectedDate(null);
                toast("🎉 Appointment added successfully", {
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
                resetForm();
              }
              if (showOtpField) {
                setLoader(false);
              }
            },
            getError: (err) => {},
            router,
            method: "post",
            data: showOtpField ? { otp: otp } : values,
          });
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
            <div className="w-full relative">
              {showOtpField && (
                <div className="absolute z-[200] cursor-not-allowed w-full h-full" />
              )}
              <div className="mt-4 w-full">
                <CustomInput
                  required
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
              <div className="mt-4 w-full transition-all duration-300 ease-out">
                <CustomInput
                  type="number"
                  required
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
              <div className="mt-4 w-full">
                <p className="mb-2 font-poppins text-white">
                  Sex <span className="text-red-500">*</span>
                </p>
                <RadioGroup
                  onValueChange={(e) => {
                    errors.sex = "";
                    values.sex = e;
                  }}
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

                {errors.sex && (
                  <p className=" font-poppins mt-1 text-[10px] mb-[-10px] text-[#f46a6a]">
                    {errors.sex}
                  </p>
                )}
              </div>

              <div className="mt-4 w-full">
                <div className="w-full ">
                  <MultiSelectComp
                    full={true}
                    title="Pick a Member"
                    required={true}
                    onChange={(e: any) => {
                      setSelectedDate(null);
                      values.date = null;
                      values.memberId = e.value;
                      setMembersArrErr("");
                    }}
                    isMulti={false}
                    placeholder="Members"
                    options={membersArr.length > 0 ? membersArr : []}
                    error={membersArrErr}
                  />
                </div>
              </div>

              <div className="mt-4 w-full ">
                <p className="mb-1 font-poppins text-white">
                  Pick a Appointment Date{" "}
                  <span className="text-red-500">*</span>
                </p>

                <Buttons
                  type="button"
                  onClick={() => {
                    if (values.memberId == null) {
                      setMembersArrErr("Please select member first");
                      return;
                    }
                    setMembersArrErr(null);
                    setShowCalenar(!showCalenar);
                  }}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !values.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    <p className="text-textprimary font-sm">{values.date}</p>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Buttons>
                {errors.date && (
                  <p className="font-poppins mt-1 text-[10px]  mb-[-10px] text-[#f46a6a]">
                    {errors.date}
                  </p>
                )}
              </div>
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
                      errors.date = "";
                      setSelectedDate(e);
                      if (values.memberId !== null) {
                        getAllSlots({ date: e, member: values.memberId });
                      }
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

              <div className="mt-4 w-full">
                <div className="w-full ">
                  <MultiSelectComp
                    full={true}
                    title="Pick a Appointment Slot"
                    required={true}
                    onChange={(e: any) => {
                      errors.slot = "";
                      values.slot = {
                        startTime: e.startTime,
                        endTime: e.endTime,
                      };
                      setSelectedSlot({
                        startTime: e.startTime,
                        endTime: e.endTime,
                      });
                      // selectedDuration.minutes = e.value;
                      // setSelectedDuration({ ...selectedDuration });
                    }}
                    isMulti={false}
                    placeholder="Slots"
                    options={slotsArr.length > 0 ? slotsArr : []}
                  />
                  {errors.slot && (
                    <p className=" font-poppins mt-1 text-[10px] mb-[-10px] text-[#f46a6a]">
                      {errors.slot}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {showOtpField && (
              <div className="mt-4 w-full transition-all duration-300 ease-out">
                <p className="mb-1 font-poppins text-white font-sm">
                  Verify OTP
                </p>
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
            <div className="mb-2 mt-8">
              <Button
                type="submit"
                title={showOtpField ? "Verify" : "Add Appointment"}
              />
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Appointment;
