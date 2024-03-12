"use client";
import AnimatedBtn from "@/app/components/ui/AnimatedBtn";
import React from "react";

interface ticketTypes {
  name: string;
  ticketId: string;
  mobile: string;
  id: string;
  slot: string;
}

function TicketCards({ tickets }: { tickets: ticketTypes[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
      {tickets.map((ticket: ticketTypes, index) => {
        return (
          <div
            className="p-2 border border-[#ffffff30] rounded-md shadow-md"
            key={ticket.id}
          >
            <p className="text-textPrimary font-mont text-base sm:text-lg">
              {ticket.ticketId}
            </p>
            <p className="text-textPrimary font-poppins text-sm sm:text-base">
              {ticket.name}
            </p>
            <p className="text-textSecondary font-poppins text-sm sm:text-sm">
              {ticket.slot}
            </p>
            <div className="flex justify-between mt-2">
              <AnimatedBtn title="In progress" onClick={() => {}} />
              <AnimatedBtn title="Call" onClick={() => {}} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TicketCards;
