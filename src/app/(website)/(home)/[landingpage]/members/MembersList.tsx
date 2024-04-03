"use client";
import AnimatedBtn from "@/app/components/ui/AnimatedBtn";
import Loader from "@/app/components/ui/Loader";
import { setdisablememberAdd } from "@/store/slices/commonSlices";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function MembersList() {
  const [memberList, setMemberList] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    apicall({
      path: "members/list",
      getResponse: (res) => {
        setMemberList(res.data.members);
        dispatch(setdisablememberAdd(res.data.disableAdd));
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);

  if (memberList.length == 0) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-4 xsm:grid-cols-1 pt-6 md:grid-cols-2">
      {memberList.map((member, ind) => {
        return (
          <div
            className="flex flex-col w-full p-2 border border-[#ffffff30] rounded-lg shadow-md  "
            key={member.id}
          >
            {member.name}
            <div className="mt-4 flex justify-between ">
              <AnimatedBtn
                title="Call"
                onClick={() => {
                  console.log(member, "PPP");
                  var telUrl = "tel:" + member?.mobile;
                  window.open(telUrl);
                }}
              />
              {/* <AnimatedBtn title="Delete" onClick={() => {}} /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MembersList;
