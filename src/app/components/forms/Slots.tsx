"use client";
import React, { useRef, useState } from "react";
import MultiSelectComp from "../MultiSelectComp";

function Slots() {
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

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
  const [monthOfYears, setMonthOfYears] = useState([
    {
      id: 1,
      month: "JAN",
      name: "january",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 2,
      month: "FEB",
      name: "February",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 3,
      month: "MAR",
      name: "March",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 4,
      month: "APR",
      name: "April",
      isActive: false,
      isDisabled: false,
    },
    { id: 5, month: "MAY", name: "May", isActive: false, isDisabled: false },
    {
      id: 6,
      month: "JUN",
      name: "June",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 7,
      month: "JUL",
      name: "July",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 8,
      month: "AUG",
      name: "August",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 9,
      month: "SEP",
      name: "September",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 10,
      month: "OCT",
      name: "October",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 11,
      month: "NOV",
      name: "November",
      isActive: false,
      isDisabled: false,
    },
    {
      id: 12,
      month: "DEC",
      name: "December",
      isActive: false,
      isDisabled: false,
    },
  ]);

  const [dayOfWeek, setDaysOfWeek] = useState([
    { id: 0, days: "S", name: "Sunday", isActive: false },
    { id: 1, days: "M", name: "Monday", isActive: false },
    { id: 2, days: "T", name: "Tuesday", isActive: false },
    { id: 3, days: "W", name: "Wednesday", isActive: false },
    { id: 4, days: "T", name: "Thursday", isActive: false },
    { id: 5, days: "F", name: "Friday", isActive: false },
    { id: 6, days: "S", name: "Saturday", isActive: false },
  ]);

  return (
    <div>
      <div className="my-[20px] w-full">
        <div className="flex flex-col w-full">
          <label
            className={`font-sans text-md  font-medium  transition-all duration-200 ease-in-out left-4`}
          >
            Duration of Slot
          </label>{" "}
          <div className="flex  w-full justify-between mt-[5px] sm:justify-stretch sm:gap-2 xsm:justify-stretch xsm:gap-2">
            <div className="w-[25%] sm:w-full xsm:w-full">
              <div className="col-md-12">
                <MultiSelectComp
                  full={true}
                  refSelect={hoursRef}
                  title="Hours"
                  onChange={(e) => {
                    // validation.setFieldValue("hours", e.value);
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
            <div className="w-[25%] sm:w-full xsm:w-full">
              <div className="w-full ">
                <MultiSelectComp
                  full={true}
                  title="Minutes"
                  refSelect={minutesRef}
                  required={true}
                  onChange={(e) => {
                    // validation.setFieldValue("minutes", e.value);
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
            <div className="w-[10%]" />
          </div>
          <div>
            <p className="text-[10px] mt-[5px] text-red-500">
              {/* {activityDurationErr} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slots;
