"use client";
import React, { useEffect, useState } from "react";
import MembersList from "./MembersList";
import AddMembers from "@/app/components/forms/AddMembers";
import { apicall } from "@/utils/getdata";
import { setdisablememberAdd } from "@/store/slices/commonSlices";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { getUserData } from "@/store/slices/authSlice";

function Members() {
  const router = useRouter();
  const dispatch = useDispatch();
  const businessUserData = useSelector(getUserData);

  const [memberList, setMemberList] = useState<any>(null);
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
  return (
    <div className="flex xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
      {/* <div className="absolute z-[0] bg-black/20 h-full w-full rounded-md backdrop-blur-md blur-xl" /> */}
      <div className="relative xsm:w-[95%] mx-auto  md:w-[40%] z-1 ">
        <div className="flex  ml-[-10px] items-center">
          <ChevronLeft
            onClick={() => {
              router.push("/" + businessUserData.slug);
            }}
            className="text-textPrimary cursor-pointer"
          />
          <p className="text-xl text-textPrimary dark:text-textPrimary">
            Add Employee
          </p>
        </div>
        <AddMembers
          addMemberToList={(e) => {
            if (memberList && (memberList as any[]).length >= 0) {
              let members: any[] = memberList;

              members.push(e);
              setMemberList([...members]);
            }
          }}
        />
      </div>
      <div className="relative xsm:w-[95%] mx-auto  md:w-[50%] z-1 mb-10">
        <p className="text-xl text-textPrimary dark:text-textPrimary">
          Employee List
        </p>
        <MembersList memberList={memberList} />
      </div>
    </div>
  );
}

export default Members;
