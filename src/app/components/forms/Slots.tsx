"use client";
import React, { useRef, useState } from "react";
import MultiSelectComp from "../MultiSelectComp";
import { ChevronLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setBusinessSectionType } from "@/store/slices/commonSlices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Button from "../ui/Button";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";

interface timeselector {
  startTime: Date | null;
  endTime: Date | null;
  breakTimeStart: Date | null;
  breakTimeEnd: Date | null;
}

interface selecteddur {
  hours: number;
  minutes: number;
}

interface slot {
  startTime: string;
  endTime: string;
}

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
    if (currentSlotStart >= breakStart && currentSlotStart < breakEnd) {
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

function Slots() {
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const [timeSelector, setTimeSelector] = useState<timeselector>({
    startTime: moment("09:00:00", "HH:mm:ss").toDate(),
    endTime: moment("18:00:00", "HH:mm:ss").toDate(),
    breakTimeStart: moment("13:00:00", "HH:mm:ss").toDate(),
    breakTimeEnd: moment("14:00:00", "HH:mm:ss").toDate(),
  });

  const [selectedDuration, setSelectedDuration] = useState<selecteddur>({
    hours: 0,
    minutes: 0,
  });

  const [generatedSlots, setGeneratedSlots] = useState<any>([]);

  const hoursArr = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 11,
      label: "11",
    },
    {
      value: 12,
      label: "12",
    },
    {
      value: 13,
      label: "13",
    },
    {
      value: 14,
      label: "14",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 16,
      label: "16",
    },
    {
      value: 17,
      label: "17",
    },
    {
      value: 18,
      label: "18",
    },
    {
      value: 19,
      label: "19",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 21,
      label: "21",
    },
    {
      value: 22,
      label: "22",
    },
    {
      value: 23,
      label: "23",
    },
  ];

  const minutesArr = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 35,
      label: "35",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 45,
      label: "45",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 55,
      label: "55",
    },
  ];

  const [dayOfWeek, setDaysOfWeek] = useState([
    { id: 0, days: "S", name: "Sunday", isActive: false },
    { id: 1, days: "M", name: "Monday", isActive: false },
    { id: 2, days: "T", name: "Tuesday", isActive: false },
    { id: 3, days: "W", name: "Wednesday", isActive: false },
    { id: 4, days: "T", name: "Thursday", isActive: false },
    { id: 5, days: "F", name: "Friday", isActive: false },
    { id: 6, days: "S", name: "Saturday", isActive: false },
  ]);

  const [durationErr, setDurationErr] = useState("");
  const [dayOfWeekErr, setDayOfWeekErr] = useState("");

  const handleSubmit = () => {
    if (selectedDuration.hours === 0 && selectedDuration.minutes === 0) {
      setDurationErr(
        "Please enter duration to create slots, duration cannot be empty"
      );

      return;
    } else {
      setDurationErr("");
    }

    const dayofWeekSelected = dayOfWeek.find((d) => d.isActive == true);

    if (!dayofWeekSelected) {
      setDayOfWeekErr("Please select available days for available slots");
      return;
    } else {
      setDayOfWeekErr("");
    }
    console.log(dayofWeekSelected, "YYYYY");

    const data = { ...selectedDuration, ...timeSelector };

    const timeSlots = generateTimeSlots(data);
    setGeneratedSlots(timeSlots);

    apicall({
      path: "slots",
      getResponse: (res) => {
        console.log(res.data, "HEY");
      },
      getError: (err) => {},
      router,
      method: "post",
      data: JSON.stringify({
        slots: timeSlots,
        weekDays: dayOfWeek,
      }),
    });
  };

  return (
    <div>
      <div
        onClick={() => {
          dispatch(setBusinessSectionType("1"));
        }}
        className="my-4 flex cursor-pointer"
      >
        <ChevronLeft />
        <p className="text-base font-poppins ">Go Back</p>
      </div>
      <div className="my-[20px] w-full">
        <div className="flex flex-col w-full">
          <label
            className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4`}
          >
            Duration of Slot
          </label>{" "}
          <div className="flex  w-full justify-between md:justify-start mt-[5px] ">
            <div className="w-[47%] md:w-[20%] md:mr-4">
              <div className="col-md-12">
                <MultiSelectComp
                  full={true}
                  refSelect={hoursRef}
                  title="Hours"
                  onChange={(e: any) => {
                    selectedDuration.hours = e.value;
                    setSelectedDuration({ ...selectedDuration });
                  }}
                  isMulti={false}
                  required={true}
                  placeholder="Hours"
                  options={hoursArr !== null ? hoursArr : []}
                  defaultValue={{
                    label: "0",
                    value: "0",
                  }}
                />
              </div>
            </div>
            <div className="w-[47%] md:w-[20%]">
              <div className="w-full ">
                <MultiSelectComp
                  full={true}
                  title="Minutes"
                  refSelect={minutesRef}
                  required={true}
                  onChange={(e: any) => {
                    selectedDuration.minutes = e.value;
                    setSelectedDuration({ ...selectedDuration });
                  }}
                  isMulti={false}
                  placeholder="Minutes"
                  options={minutesArr !== null ? minutesArr : []}
                  defaultValue={{
                    label: "0",
                    value: "0",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm mt-[5px] text-red-500">{durationErr}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[450px]  my-[10px]">
        <div className="w-full flex justify-between ">
          <div>
            <label
              className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4`}
            >
              Select available days
            </label>
          </div>
          <div>
            <label
              onClick={() => {
                dayOfWeek.map((d, i) => {
                  d.isActive = true;
                });
                setDaysOfWeek([...dayOfWeek]);
              }}
              className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4`}
            >
              Select All
            </label>
          </div>
        </div>
        <div className="weekDays-selector">
          {dayOfWeek.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <div className="inline-flex items-center">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox"
                    data-ripple-dark="true"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-[40px] w-[40px] cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-textPrimary checked:bg-textPrimary checked:before:bg-textPrimary hover:before:opacity-10"
                      id={data.name}
                      onClick={(e) => {
                        data.isActive = !data.isActive;
                        setDaysOfWeek([...dayOfWeek]);
                      }}
                      checked={data.isActive}
                      defaultChecked={data.isActive}
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4  transition-opacity peer-checked:opacity-100">
                      <label
                        className={`${
                          data.isActive
                            ? "text-background"
                            : "text-textSecondary"
                        }`}
                        htmlFor={data.name}
                      >
                        {data.days}
                      </label>
                    </div>
                  </label>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div>
          <p className="text-sm mt-[5px] text-red-500">{dayOfWeekErr}</p>
        </div>
      </div>

      <div className="my-[20px] w-full flex justify-between md:justify-start">
        <div className="flex flex-col w-[47%] my-[5px] md:w-[20%] md:mr-4">
          <div className="mb-2">
            <label
              className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4 `}
              htmlFor="startTime"
            >
              Start Time
            </label>
            <span className="text-red-600"> *</span>
          </div>
          <DatePicker
            id={"startTime"}
            selected={timeSelector.startTime}
            onChange={(e) => {
              timeSelector.startTime = e;
              setTimeSelector({ ...timeSelector });
            }}
            showTimeSelect
            className="h-[40px] text-md bg-background  text-textPrimary dark:text-textPrimary dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>

        <div className="flex flex-col w-[47%] my-[5px] md:w-[20%] ">
          <div className="mb-2">
            <label
              className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4 `}
              htmlFor="startTime"
            >
              End Time
            </label>
            <span className="text-red-600"> *</span>
          </div>
          <DatePicker
            id={"endTime"}
            selected={timeSelector.endTime}
            onChange={(e) => {
              timeSelector.endTime = e;
              setTimeSelector({ ...timeSelector });
            }}
            showTimeSelect
            className="h-[40px] text-md bg-background  text-textPrimary dark:text-textPrimary dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </div>

      <div className="my-[20px] w-full flex justify-between md:justify-start">
        <div className="flex flex-col w-[47%] my-[5px] md:w-[20%] md:mr-4">
          <div className="mb-2">
            <label
              className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4 `}
              htmlFor="startTime"
            >
              Break Start Time
            </label>
            <span className="text-red-600"> *</span>
          </div>
          <DatePicker
            id={"startTime"}
            selected={timeSelector.breakTimeStart}
            onChange={(e) => {
              timeSelector.breakTimeStart = e;
              setTimeSelector({ ...timeSelector });
            }}
            showTimeSelect
            className="h-[40px] text-md bg-background  text-textPrimary dark:text-textPrimary dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>

        <div className="flex flex-col w-[47%] my-[5px] md:w-[20%] ">
          <div className="mb-2">
            <label
              className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4 `}
              htmlFor="startTime"
            >
              Break End Time
            </label>
            <span className="text-red-600"> *</span>
          </div>
          <DatePicker
            id={"endTime"}
            selected={timeSelector.breakTimeEnd}
            onChange={(e) => {
              timeSelector.breakTimeEnd = e;
              setTimeSelector({ ...timeSelector });
            }}
            showTimeSelect
            className="h-[40px] text-md bg-background  text-textPrimary dark:text-textPrimary dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </div>
      </div>
      <div className="mt-6 mb-4">
        <Button type="button" onClick={handleSubmit} title="Generate Slots" />
      </div>

      {generatedSlots.length > 0 && (
        <div className="bg-black my-10 rounded-md shadow-md px-4 py-8">
          <p
            className={`font-sans text-xl mb-8 font-medium  transition-all duration-200 ease-in-out left-4`}
          >
            Total Slots Generated : {generatedSlots.length}
          </p>
          <div className="flex gap-4 flex-wrap w-full">
            {generatedSlots.map((slot: slot, ind: any) => {
              return (
                <div
                  className="flex justify-center  border border-textPrimary p-2 rounded-lg w-[200px]"
                  key={ind}
                >
                  <p>{slot.startTime + " - " + slot.endTime}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Slots;
