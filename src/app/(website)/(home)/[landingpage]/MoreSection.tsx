"use client";

import { Tabs } from "@/app/components/ui/tabs";
import { getBusinessSectionType } from "@/store/slices/commonSlices";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TicketCards from "./TicketCards";
import Slots from "@/app/components/forms/Slots";
import Button from "@/app/components/ui/Button";
import { getBusinessLoggedIn } from "@/store/slices/authSlice";

function MoreSection({ businessData }: { businessData: any }) {
  const businessPageType = useSelector(getBusinessSectionType);

  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);

  const customerView = !isBusinessLoggedIn;

  const upcomingData = [
    {
      name: "Mahesh Chambhare",
      ticketId: "#0",
      mobile: "8767431997",
      id: "0",
      slot: "09:00AM - 09:30AM",
    },
    {
      name: "Pavan Chambhare",
      ticketId: "#1787",
      mobile: "8767431997",
      id: "1",
      slot: "09:30AM - 10:00AM",
    },
    {
      name: "Amitabh Shah",
      ticketId: "#07654",
      mobile: "8767431997",
      id: "2",
      slot: "10:30AM - 11:00AM",
    },
    {
      name: "Elon  Musk",
      ticketId: "#02344",
      mobile: "8767431997",
      id: "3",
      slot: "11:00AM - 11:30AM",
    },
    {
      name: "Jeff bozos",
      ticketId: "#05676",
      mobile: "8767431997",
      id: "4",
      slot: "11:30AM - 12:00AM",
    },
  ];

  const inProgressData = [
    {
      name: "Mahesh Chambhare",
      ticketId: "#1",
      mobile: "8767431997",
      id: "10",
      slot: "09:00AM - 09:30AM",
    },
    {
      name: "Pavan Chambhare",
      ticketId: "#17337",
      mobile: "8767431997",
      id: "13",
      slot: "09:30AM - 10:00AM",
    },
    {
      name: "Amitabh Shah",
      ticketId: "#0454",
      mobile: "8767431997",
      id: "22",
      slot: "10:30AM - 11:00AM",
    },
    {
      name: "Elon  Musk",
      ticketId: "#023de44",
      mobile: "8767431997",
      id: "6",
      slot: "11:00AM - 11:30AM",
    },
    {
      name: "Jeff bozos",
      ticketId: "#056tt76",
      mobile: "8767431997",
      id: "42",
      slot: "11:30AM - 12:00AM",
    },
    {
      name: "Pavan Chambhare",
      ticketId: "#17337",
      mobile: "8767431997",
      id: "13",
      slot: "09:30AM - 10:00AM",
    },
    {
      name: "Amitabh Shah",
      ticketId: "#0454",
      mobile: "8767431997",
      id: "22",
      slot: "10:30AM - 11:00AM",
    },
    {
      name: "Elon  Musk",
      ticketId: "#023de44",
      mobile: "8767431997",
      id: "6",
      slot: "11:00AM - 11:30AM",
    },
    {
      name: "Jeff bozos",
      ticketId: "#056tt76",
      mobile: "8767431997",
      id: "42",
      slot: "11:30AM - 12:00AM",
    },
  ];

  const tabs = [
    {
      title: "Upcoming",
      value: "upcoming",
      content: (
        <div className="w-full h-full relative  mb-[100px]  py-4 px-4 ">
          <TicketCards tickets={upcomingData} />
        </div>
      ),
    },
    {
      title: "In Progress",
      value: "inprogress",
      content: (
        <div className="w-full h-full relative  mb-[100px]  py-4 px-4 ">
          <TicketCards tickets={inProgressData} />
        </div>
      ),
    },
    !customerView && {
      title: "Completed",
      value: "Completed",
      content: (
        <div className="w-full h-full relative  mb-[100px]  py-4 px-4 ">
          <TicketCards tickets={upcomingData} />
        </div>
      ),
    },
  ];

  const handleSubmit = () => {};

  return (
    <div className="relative max-h-max ">
      {businessPageType === "1" ? (
        <div className="relative [perspective:1000px]   flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-4">
          <Tabs tabs={tabs} />
        </div>
      ) : (
        <Slots />
      )}

      {businessPageType === "1" && (
        <div className="fixed bottom-0 bg-background py-4 left-0 right-0 self-center mx-auto flex justify-center">
          <Button
            type="button"
            onClick={handleSubmit}
            title="Book Your Appointment"
          />
        </div>
      )}
    </div>
  );
}

export default MoreSection;
