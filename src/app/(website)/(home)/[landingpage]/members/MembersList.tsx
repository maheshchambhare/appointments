"use client";
import AnimatedBtn from "@/app/components/ui/AnimatedBtn";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MembersList() {
  const [memberList, setMemberList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    apicall({
      path: "members/list",
      getResponse: (res) => {
        console.log(res.data, "HEY");
        setMemberList(res.data.members);
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);

  if (memberList.length == 0) {
    return null;
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
              <AnimatedBtn title="Call" onClick={() => {}} />
              <AnimatedBtn title="Delete" onClick={() => {}} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MembersList;
