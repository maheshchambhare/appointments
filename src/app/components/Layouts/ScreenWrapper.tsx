"use client";
// import { getMessaging, onMessage } from "firebase/messaging";
// import { useEffect } from "react";

// import { app } from "../utils/firebase/firebase";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getCallAppointments,
//   setCallAppointments,
// } from "@/store/slices/commonSlices";

const ScreenWrapper = ({ children }: { children?: React.ReactNode }) => {
  // const dispatch = useDispatch();
  // const callAppointments = useSelector(getCallAppointments);
  // useEffect(() => {
  //   if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  //     const messaging = getMessaging(app);
  //     const unsubscribe = onMessage(messaging, (payload: any) => {
  //       dispatch(setCallAppointments(!callAppointments));

  //       toast(
  //         `A new Appointment has been added for customer ${payload.data.customer}`,
  //         {
  //           position: "bottom-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           transition: Bounce,
  //         }
  //       );
  //     });
  //     return () => {
  //       unsubscribe(); // Unsubscribe from the onMessage event
  //     };
  //   }
  // }, []);

  return (
    <div className="w-[95%] relative  lg:w-[80%] xl:w-[70%] mx-auto ">
      {children}
    </div>
  );
};

export default ScreenWrapper;
