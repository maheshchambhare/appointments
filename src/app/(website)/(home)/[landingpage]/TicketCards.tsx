"use client";
import AnimatedBtn from "@/app/components/ui/AnimatedBtn";
import { getBusinessLoggedIn, getUserTypeData } from "@/store/slices/authSlice";
import { apicall } from "@/utils/getdata";
import React from "react";
import { useSelector } from "react-redux";

interface ticketTypes {
  name: string;
  ticketId: string;
  mobile: string;
  id: string;
  slot: {
    startTime: string;
    endTime: string;
  };
  User: any;
  status: string;
  Member: any;
  date: string;
  service: {
    name: string;
    price: string;
  };
}

function TicketCards({
  tickets,
  router,
  update,
}: {
  tickets: any[];
  router: any;
  update: ({ status, id }: { status: string; id: string }) => void;
}) {
  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);
  const getUserType = useSelector(getUserTypeData);
  const customerView = !isBusinessLoggedIn;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
      {tickets.length > 0 ? (
        tickets.map((ticket: ticketTypes, index) => {
          return (
            <div
              className="p-2 border border-[#ffffff30] rounded-md shadow-md"
              key={ticket.id}
            >
              <div className="flex justify-between ">
                <p className="text-textPrimary font-mont text-base sm:text-lg">
                  #{ticket.ticketId}
                </p>

                <p className="text-textSecondary font-poppins text-sm sm:text-sm">
                  {ticket.date}
                </p>
              </div>
              <p className="text-textPrimary font-poppins text-sm sm:text-base">
                {!customerView && ticket?.User.name}
              </p>
              <p className="text-textSecondary font-poppins text-sm sm:text-sm">
                {getUserType != 1 && "Employee: " + ticket?.Member.name}
              </p>
              <p className="text-textSecondary font-poppins text-sm sm:text-sm">
                {"Service: " +
                  ticket?.service.name +
                  " - " +
                  ticket?.service.price}
              </p>
              <p className="text-textSecondary font-poppins text-sm sm:text-sm">
                {ticket.slot?.startTime} - {ticket.slot?.endTime}
              </p>

              {!customerView && (
                <div className="flex justify-between mt-2">
                  {ticket?.status != "2" && ticket?.status != "3" && (
                    <AnimatedBtn
                      title={ticket?.status == "1" ? "Complete" : "In progress"}
                      onClick={() => {
                        update({
                          status: ticket?.status == "1" ? "2" : "1",
                          id: ticket.id,
                        });
                      }}
                    />
                  )}
                  {ticket?.status == "0" && (
                    <AnimatedBtn
                      title={"Cancel"}
                      onClick={() => {
                        update({
                          status: "3",
                          id: ticket.id,
                        });
                      }}
                    />
                  )}
                  <AnimatedBtn
                    title="Call"
                    onClick={() => {
                      var telUrl = "tel:" + ticket.User.mobile;

                      // Open the dialer with the constructed URL
                      window.open(telUrl);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No tickets available</p>
      )}
    </div>
  );
}

export default TicketCards;
