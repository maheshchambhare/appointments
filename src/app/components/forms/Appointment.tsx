"use client";
import React, { useEffect, useRef, useState } from "react";
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

import html2canvas from "html2canvas";
import ModalLayout from "../ModalLayout";
import Loader from "../ui/Loader";

function generateTimeSlots(data: any) {
  const { startTime, endTime, breakTimeStart, breakTimeEnd, hours, minutes } =
    data;
  const start = new Date(startTime);
  const end = new Date(endTime);
  const breakStart = new Date(breakTimeStart);
  const breakEnd = new Date(breakTimeEnd);

  const slotDuration = hours * 60 + minutes; // Slot duration in minutes
  const slots = [];

  let currentSlotStart = new Date(start);

  // Loop through each slot
  while (currentSlotStart < end) {
    const currentSlotEnd = new Date(
      currentSlotStart.getTime() + slotDuration * 60000
    );

    // Check if the current slot falls within the break time
    if (
      (currentSlotStart >= breakStart && currentSlotStart < breakEnd) ||
      (currentSlotEnd > breakStart && currentSlotEnd <= breakEnd) ||
      (currentSlotStart < breakStart && currentSlotEnd > breakEnd)
    ) {
      // Move the slot to the end of the break
      currentSlotStart.setTime(breakEnd.getTime());
      currentSlotEnd.setTime(currentSlotStart.getTime() + slotDuration * 60000);
    }

    // Add slot to the array
    slots.push({
      startTime: moment(new Date(currentSlotStart)).format("hh:mm A"),
      endTime: moment(new Date(currentSlotEnd)).format("hh:mm A"),
    });

    // Move to the next slot
    currentSlotStart.setTime(currentSlotStart.getTime() + slotDuration * 60000);
  }

  return slots;
}

const Appointment = ({
  businessData,
  title,
}: {
  businessData: any;
  title: string;
}) => {
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
  const [slots, setSlots] = useState<any>([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showTicket, setShowticket] = useState(false);
  const [ticket, setTicket] = useState<any>(null);

  const [loader, setLoader] = useState<boolean>(false);
  const [slotsLoader, setSlotsLoader] = useState<boolean>(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState<boolean>(false);

  const businessUserData = businessData;

  const [packageList, setPackageList] = useState<any>([]);
  const [packageListExt, setPackageListExt] = useState<any>([]);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const packageRef: any = useRef(null);
  const slotRef: any = useRef(null);

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0 && showOtpField) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds, showOtpField]);

  useEffect(() => {
    apicall({
      path: "service/list",
      getResponse: (res) => {
        // dispatch(setdisablememberAdd(res.data.disableAdd));
        let pkgArr: any[] = [];
        res.data.packages.map((d: any, i: any) => {
          let obj = {
            label: d.name + " - ₹" + d.price,
            value: d.id,
            duration: d.duration,
            gender: d.gender,
          };
          pkgArr.push(obj);
        });
        setPackageList(pkgArr);
        setPackageListExt(pkgArr);
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);

  useEffect(() => {
    if (businessUserData.members) {
      let people: any[] = [];
      businessUserData.members.map((member: any, i: number) => {
        let obj = {
          label: member.name,
          value: member.id,
          fcmToken: member.fcmToken,
        };
        people.push(obj);
      });
      setMembersArr(people);
    }
  }, [businessUserData]);

  const daysOfWeek = businessData.weekdays;

  interface FinalForm {
    name: string;
    mobile: string;
    sex: string;
    date: null | string;
    slot: null | { startTime: string; endTime: string }; // Assuming slot can be either null or a string
    memberId: null | string; // Assuming memberId can be either null or a string
    fcmToken?: String;
    serviceId?: string;
  }

  const finalForm: FinalForm = {
    name: "",
    mobile: "",
    sex: "",
    date: null,
    slot: null,
    memberId: null,
    fcmToken: "",
    serviceId: "",
  };

  const getAllSlots = ({ date, member }: { date: string; member: string }) => {
    setSlotsLoader(true);
    apicall({
      path: "getslots",
      getResponse: (res) => {
        const disSlots = res.data.slots;

        const curretDate = moment(new Date(), "DD/MM/YYYY").format(
          "DD/MM/YYYY"
        );
        const currentTime = moment();

        if (slots) {
          const filteredSlots = slots?.filter((slot: any) => {
            const slotStartTime = moment(slot.startTime, "hh:mm A");
            const isbefore = slotStartTime.isBefore(currentTime, "minute");

            // Check if the slot exists in disSlots array
            return !disSlots.some((disSlot: any) => {
              // You need to define the condition for matching slots
              // For example, if the slots are objects and you want to match based on startTime and endTime

              // Get current time as moment object

              return (
                (slot.startTime >= disSlot.slot.startTime &&
                  slot.startTime < disSlot.slot.endTime) ||
                (slot.endTime > disSlot.slot.startTime &&
                  slot.endTime <= disSlot.slot.endTime) ||
                (slot.startTime < disSlot.slot.startTime &&
                  slot.endTime > disSlot.slot.endTime) ||
                (date == curretDate && isbefore)
              );
            });
          });

          let slotsArr: any[] = [];
          filteredSlots.map((d: any, i: number) => {
            let obj = {
              label: `${d.startTime} - ${d.endTime}`,
              value: `${d.startTime} - ${d.endTime}`,
              ...d,
            };
            slotsArr.push(obj);
          });

          setSlotsArr(slotsArr);
        }

        setSlotsLoader(false);
      },
      getError: (err) => {
        setSlotsLoader(false);
      },
      router,
      method: "post",
      data: { date, member },
    });
  };

  const handleDownload = () => {
    html2canvas(document?.querySelector("#ticket") as HTMLElement).then(
      function (canvas: any) {
        const link = document.createElement("a");
        link.download = "appointment.png";
        link.href = canvas.toDataURL();
        link.click();
      }
    );
  };

  if (loader) {
    return (
      <div className="flex h-[40vh] justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[300px] mt-[50px] mx-auto">
      <p className="font-sans text-textPrimary text-2xl font-semibold">
        Welcome to {title}
      </p>
      <p className="font-sans text-textSecondary text-base font-normal">
        Fill out the form below to book your appointment
      </p>
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
              } else if (res.status == 202) {
                setUserAlreadyExist(true);
                setTicket(res.data.data);
                setShowOtpField(false);
                setSelectedDate(null);
                setOtp("");
                setShowticket(true);
              } else {
                setTicket(res.data.data);
                setShowOtpField(false);
                setSelectedDate(null);
                setOtp("");
                setShowticket(true);
              }
            },
            getError: (err) => {
              toast(err.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "error",
                transition: Bounce,
              });
            },
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
          submitCount,
          resetForm,
          /* and other goodies */
        }) => (
          <>
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
                    Gender <span className="text-red-500">*</span>
                  </p>
                  <RadioGroup
                    onValueChange={(e) => {
                      errors.sex = "";
                      values.sex = e;
                      setSelectedPackage(null);
                      values.serviceId = "";
                      values.date = null;
                      values.slot = null;
                      setSelectedDate(null);
                      setSelectedSlot(null);

                      const packages = packageListExt.filter(
                        (d: any, i: any) => d.gender == values.sex
                      );
                      setPackageList([...packages]);
                      if (
                        packageRef &&
                        packageRef.current &&
                        selectedPackage !== null
                      ) {
                        packageRef.current?.clearValue();
                      }

                      if (slotRef && slotRef.current && selectedSlot !== null) {
                        slotRef.current?.clearValue();
                      }
                    }}
                    className="flex flex-wrap "
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label className="text-textPrimary" htmlFor="male">
                        Male
                      </Label>
                    </div>
                    <div className="flex ml-4 items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label className="text-textPrimary" htmlFor="female">
                        Female
                      </Label>
                    </div>
                    <div className="flex ml-4 items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label className="text-textPrimary" htmlFor="other">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>

                  {submitCount > 0 && errors.sex && (
                    <p className=" font-poppins mt-1 text-[10px] mb-[-10px] text-[#f46a6a]">
                      {errors.sex}
                    </p>
                  )}
                </div>

                <div className="mt-4 w-full">
                  <div className="w-full ">
                    <MultiSelectComp
                      full={true}
                      title="Select Professional"
                      required={true}
                      onChange={(e: any) => {
                        setSelectedDate(null);
                        values.date = null;
                        values.memberId = e.value;
                        values.fcmToken = e.fcmToken;
                        setMembersArrErr("");
                      }}
                      isMulti={false}
                      placeholder="Professional"
                      options={membersArr.length > 0 ? membersArr : []}
                      error={submitCount > 0 && membersArrErr}
                    />
                  </div>
                </div>

                <div className="mt-4 w-full">
                  <div className="w-full ">
                    <MultiSelectComp
                      full={true}
                      title="Select Service"
                      refSelect={packageRef}
                      required={true}
                      onChange={(e: any) => {
                        if (e) {
                          setSelectedPackage(e);

                          const data = {
                            startTime: businessUserData.startTime,
                            endTime: businessUserData.endTime,
                            breakTimeStart: businessUserData.breakTimeStart,
                            breakTimeEnd: businessUserData.breakTimeEnd,
                            hours: e.duration.hours,
                            minutes: e.duration.minutes,
                          };

                          values.serviceId = e.value;
                          const timeSlots = generateTimeSlots(data);

                          setSlots(timeSlots);
                        }
                      }}
                      isMulti={false}
                      placeholder="Services"
                      disabled={values.sex == ""}
                      options={packageList.length > 0 ? packageList : []}
                      error={submitCount > 0 && membersArrErr}
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
                    {/* <CalendarIcon className="mr-2 h-4 w-4 text-textPrimary" /> */}
                    {selectedDate ? (
                      <p className="text-textPrimary font-sm">{values.date}</p>
                    ) : (
                      <span className="text-textPrimary">Pick a date</span>
                    )}
                  </Buttons>
                  {submitCount > 0 && errors.date && (
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
                      daysOfWeek={daysOfWeek}
                      showCalendar={(e: any) => {
                        setShowCalenar(e);
                      }}
                      setSelDays={(e: any) => {
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
                  {slotsLoader ? (
                    <>
                      <div className="flex mt-4  justify-center items-center text-textPrimary">
                        <div className="flex flex-row gap-2">
                          <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                        </div>
                      </div>
                      <p className="text-center">Slots loading...</p>
                    </>
                  ) : (
                    <div className="w-full ">
                      <MultiSelectComp
                        full={true}
                        title="Pick a Appointment Slot"
                        required={true}
                        refSelect={slotRef}
                        onChange={(e: any) => {
                          if (e) {
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
                          }
                        }}
                        disabled={values.sex == ""}
                        isMulti={false}
                        placeholder="Slots"
                        options={slotsArr.length > 0 ? slotsArr : []}
                      />
                      {submitCount > 0 && errors.slot && (
                        <p className=" font-poppins mt-1 text-[10px] mb-[-10px] text-[#f46a6a]">
                          {errors.slot}
                        </p>
                      )}
                    </div>
                  )}
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
                  {seconds == 0 ? (
                    <p
                      onClick={() => {
                        apicall({
                          path: "addappointments",
                          getResponse: (res) => {
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
                            setSeconds(0);
                          },
                          getError: (err) => {
                            toast(err.response.data.message, {
                              position: "bottom-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              type: "error",
                              transition: Bounce,
                            });
                          },
                          router,
                          method: "post",
                          data: values,
                        });
                      }}
                      className="mt-2 text-blue-400 cursor-pointer"
                    >
                      Resend OTP
                    </p>
                  ) : (
                    <p className="mt-2 text-blue-200 cursor-disabled">
                      Resend OTP in {seconds} seconds
                    </p>
                  )}
                </div>
              )}
              <div className="mb-10 mt-8">
                <Button
                  type="submit"
                  title={showOtpField ? "Verify" : "Add Appointment"}
                />
              </div>
            </form>
            <ModalLayout
              isOpen={showTicket}
              setIsOpen={() => {
                setShowticket(false);
                resetForm();

                setLoader(true);

                setTimeout(() => {
                  setLoader(false);
                }, 500);
              }}
              // modalTitle="Ticket"
            >
              <div
                id="ticket"
                className="p-2 z-[-10] bg-background dark:bg-background "
              >
                <p className="text-center text-textPrimary  pb-2 font-sans text-lg border-b border-b-white">
                  {title}
                </p>
                <div className="flex mt-2 justify-between">
                  <p className="text-textPrimary font-mont text-base sm:text-lg">
                    #{ticket?.ticketId}
                  </p>
                  <p className="text-textPrimary font-mont text-base sm:text-lg">
                    {ticket?.date}
                  </p>
                </div>
                <p className="text-textPrimary font-poppins text-sm sm:text-base">
                  {userAlreadyExist ? ticket.name : values.name}
                </p>
                <p className="text-textSecondary  font-poppins text-sm sm:text-sm">
                  {ticket?.slot?.startTime} - {ticket?.slot?.endTime}
                </p>
                <p className="text-textSecondary pb-2 font-poppins text-sm sm:text-sm">
                  Service - {selectedPackage?.label}
                </p>
              </div>

              {userAlreadyExist && (
                <p className="font-sans w-[90%] mx-auto text-center text-red-500 text-sm">
                  An account with the same mobile number already existed. A
                  ticket has been generated using the name from the existing
                  account
                </p>
              )}
              <div className="mb-2 mt-8 flex justify-between items-center">
                <Button
                  onClick={() => {
                    handleDownload();

                    setShowticket(false);
                    resetForm();

                    setLoader(true);

                    setTimeout(() => {
                      setLoader(false);
                    }, 500);
                  }}
                  type="button"
                  title={"Download"}
                />
                <p className="ml-4 font-sans text-sm">
                  Successfully generated appointment,please download your ticket
                  for future reference
                </p>
              </div>
            </ModalLayout>
          </>
        )}
      </Formik>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Appointment;
