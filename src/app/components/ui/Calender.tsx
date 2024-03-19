import React, { useEffect, useState } from "react";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calender = ({
  packageId,
  startDate,
  activeDays,
  endDate,
  selDays,
  showCalendar,
  setSelDays,
  disDays,
  colors,
  isFiltered,
  daysOfWeek,
}) => {
  const [monthData, setMonthData] = useState([]);
  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [indexOfElement, setIndexOfElement] = useState();
  const [startTime, setStartTime] = useState(
    moment("09:00:00", "HH:mm:ss").toDate()
  );
  const [endTime, setEndTime] = useState(
    moment("19:00:00", "HH:mm:ss").toDate()
  );
  const selectedDays = selDays !== null ? selDays : [];

  const getMonthData = (selectedMonth) => {
    const monthData = [];

    if (endDate) {
      let month = moment(startDate).startOf("month");
      while (month.isBefore(endDate)) {
        let monthName = month.startOf("month").format("MMMM");

        if (monthName === selectedMonth) {
          monthData.push(month);
        }
        month = month.clone().add(1, "month");
      }
    } else {
      const date = moment(startDate).startOf("month");
      while (date.isBefore(moment(startDate).add(1, "year").endOf("month"))) {
        monthData.push(date.clone());
        date.add(1, "month");
      }
    }

    return monthData;
  };

  function getMonthList(startDate, endDate) {
    const startMonth = startDate.getMonth();
    let endMonth = endDate.getMonth();

    if (endMonth < startMonth) {
      endMonth += 12; // Add 12 months to the end month to cover the next year
    }

    const monthList = [];

    for (let i = startMonth; i <= endMonth; i++) {
      const monthIndex = i % 12; // Use modulo 12 to wrap around to the correct month index
      const date = new Date(startDate.getFullYear(), monthIndex, 1);
      const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
        date
      );
      const monthNumber = monthIndex + 1; // Add 1 to get the month number (January is 0-based)
      monthList.push({ monthName, monthNumber });
    }

    return monthList;
  }

  useEffect(() => {
    if (startDate || endDate) {
      const months = getMonthList(new Date(startDate), new Date(endDate));
      setMonthData(months);
    }
  }, [startDate, endDate]);

  const renderMonth = (month) => {
    const daysInMonth = month.daysInMonth();
    const firstDayOfMonth = month.startOf("month").format("d");
    const monthStartDate = moment(month).startOf("month");
    const days = [];
    const monthDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      monthDays.push(
        <p
          key={i}
          className="flex text-sm font-sans rounded-3xl h-[35px] justify-center items-center font-bold"
        ></p>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = moment(monthStartDate).date(i);
      const isDisabledDay = disDays.includes(day.format("DD/MM/YYYY"));

      const date = month.clone().date(i);
      const isPastDate = date.isBefore(moment(startDate), "day");

      const isDaySelectable = (day: moment.Moment): boolean => {
        const dayOfWeekIndex = day.day();
        return daysOfWeek[dayOfWeekIndex].isActive;
      };

      const canSelect = isDaySelectable(day);

      var availablDays = true;

      console.log(isDisabledDay, disDays, day.format("YYYY-MM-DD"), "UUUU");

      const isDateInFuture = endDate
        ? date.isAfter(moment(endDate), "day")
        : false;

      monthDays.push(
        <div
          key={day.format("YYYY-MM-DD")}
          onClick={(e) => {
            e.stopPropagation();
            if (!isPastDate && canSelect) {
              if (!isDateInFuture && !isDisabledDay) {
                setSelDays(day.format("DD/MM/YYYY"));
                showCalendar(false);
              }
            }
          }}
          className="select-none font-sans rounded-md cursor-pointer"
          style={{
            color: "black",
          }}
        >
          <div
            className="flex font-sans text-sm  rounded-3xl w-[35px] h-[35px] justify-center items-center font-bold"
            style={{
              border:
                isPastDate || !canSelect
                  ? ""
                  : isDisabledDay
                  ? ""
                  : !isPastDate && !isDateInFuture && isFiltered
                  ? "1px solid black"
                  : availablDays && "1px solid black",
              cursor:
                isPastDate || !canSelect
                  ? "not-allowed"
                  : isDisabledDay
                  ? "not-allowed"
                  : availablDays
                  ? " pointer"
                  : !isPastDate && !isDateInFuture && isFiltered
                  ? "pointer"
                  : "no-drop",
              background:
                isDisabledDay || !canSelect
                  ? "#fff"
                  : day.format("YYYY-MM-DD") == selectedDate
                  ? "#2E70FF"
                  : availablDays
                  ? "#FFFFFF"
                  : "#FFFFFF",
              color:
                isPastDate || !canSelect
                  ? "gray"
                  : isDisabledDay
                  ? "gray"
                  : day.format("YYYY-MM-DD") == selectedDate
                  ? "white"
                  : availablDays
                  ? "black"
                  : !isPastDate && !isDateInFuture && isFiltered
                  ? "black"
                  : "gray",
            }}
          >
            {i}
          </div>
          <div className="font-sans text-black text-center  text-[9px] font-semibold mb-[10px]">
            {" "}
            {isPastDate || isDisabledDay || isDateInFuture ? "" : ""}
          </div>
        </div>
      );
    }

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const weekDaysRow = (
      <div
        key={`${month.format("MMMM YYYY")}-weekdays`}
        className="grid mb-[10px] grid-cols-7"
      >
        {weekDays.map((day, i) => (
          <p
            key={i}
            className="text-center font-sans select-none font-medium text-black"
            style={{ color: colors.text }}
          >
            {day}
          </p>
        ))}
      </div>
    );

    return (
      <div
        key={month.format("MMMM YYYY")}
        className={`mx-auto  p-1 w-full  transition-all ease-in-out`}
        style={{ color: colors.text }}
      >
        <div className="flex  items-center text-center justify-between mb-[10px]">
          <ChevronLeft
            style={{
              color: monthIndex >= 1 ? "black" : "#bbb3b3",
            }}
            className={` cursor-pointer mr-[7px] exclude-click `}
            onClick={(e) => {
              e.stopPropagation();
              if (monthIndex >= 1) {
                setMonthIndex(monthIndex - 1);
              }
            }}
          />
          <div
            className="text-lg select-none font-semibold ml-[10px] font-sans"
            style={{ color: colors.text }}
          >
            {month.format("MMMM YYYY")}
          </div>
          <ChevronRight
            className=" cursor-pointer exclude-click"
            style={{
              color: monthData.length !== monthIndex + 1 ? "black" : "#bbb3b3",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (monthData.length !== monthIndex + 1) {
                setMonthIndex(monthIndex + 1);
              }
            }}
          />
        </div>
        {weekDaysRow}

        <div
          className="grid gap-[2px] grid-cols-7"
          style={{ color: colors.text }}
        >
          {monthDays}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-xl scrollbar-hide  overflow-hidden overflow-x-scroll ">
      {getMonthData(monthData[monthIndex]?.monthName).map((month) =>
        renderMonth(month)
      )}
    </div>
  );
};

export default Calender;
