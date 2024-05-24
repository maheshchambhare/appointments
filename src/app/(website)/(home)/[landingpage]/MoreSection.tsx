"use client";

import { Tabs } from "@/app/components/ui/tabs";
import {
  getBusinessSectionType,
  getCallAppointments,
} from "@/store/slices/commonSlices";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketCards from "./TicketCards";
import Slots from "@/app/components/forms/Slots";
import Button from "@/app/components/ui/Button";
import {
  getBusinessLoggedIn,
  getUserData,
  setUserData,
} from "@/store/slices/authSlice";
import { useRouter, useParams } from "next/navigation";
import { apicall } from "@/utils/getdata";
import Tab from "@/app/components/ui/Tab";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/app/components/ui/Loader";

function MoreSection({ businessData }: { businessData: any }) {
  const businessPageType = useSelector(getBusinessSectionType);
  const router = useRouter();
  const { landingpage } = useParams();
  const isBusinessLoggedIn = useSelector(getBusinessLoggedIn);
  const [activeTab, setActiveTab] = useState(0);
  const callAppointments = useSelector(getCallAppointments);

  const [appointments, setAppointments] = useState<any>(null);

  const tabHeaders = isBusinessLoggedIn
    ? ["Upcoming", "In Progress", "Completed", "Cancelled"]
    : ["Upcoming", "In Progress"];

  const dispatch = useDispatch();

  const customerView = !isBusinessLoggedIn;

  useEffect(() => {
    apicall({
      path: "getappointments",
      getResponse: (res) => {
        setAppointments(res.data.appointments);
      },
      getError: (err) => {
        // router.push(landingpage + "/appointment");
      },
      router,
      method: "post",
      data: {
        status: JSON.stringify(activeTab),
        id: businessData.id,
      },
    });
  }, [activeTab, callAppointments]);

  const updateTicket = ({ status, id }: { status: string; id: string }) => {
    apicall({
      path: "statuschange",
      getResponse: (res) => {
        const removeApp = appointments?.filter((d: any) => d.id !== id);

        setAppointments(removeApp);

        toast(
          `🫡 Appointment moved to  ${
            status == "1"
              ? "In Progress"
              : status == "3"
              ? "Cancelled"
              : "Complete"
          }`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
      },
      getError: (err) => {},
      router,
      method: "put",
      data: { status, id },
    });
  };

  const handleSubmit = () => {
    router.push(`${businessData.slug}/appointment`);
    // dispatch(setUserData(businessData));
  };

  if (appointments == null) {
    return (
      <div className="flex  h-[40vh] justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-h-max ">
      {businessPageType === "1" ? (
        <div className="relative [perspective:1000px]   flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-4">
          <Tab
            tabs={tabHeaders}
            selectedTab={(e) => setActiveTab(e)}
            activateTab={activeTab}
          />
          <div className="w-full h-full mt-[20px] relative  mb-[100px]  py-4 px-1 ">
            <TicketCards
              tickets={appointments}
              router={router}
              update={({ status, id }: { status: string; id: string }) =>
                updateTicket({ status, id })
              }
            />
          </div>
        </div>
      ) : (
        <Slots />
      )}

      {businessPageType === "1" && (
        <div className="fixed bottom-0 bg-background py-4 left-0 right-0 self-center mx-auto flex justify-center">
          <Button
            type="button"
            onClick={handleSubmit}
            title="Book New Appointment"
          />
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default MoreSection;
