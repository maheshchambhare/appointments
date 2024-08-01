"use client";
import React, { useEffect, useState } from "react";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { getUserData } from "@/store/slices/authSlice";
import EmployeeList from "./EmployeeList";
import AddEmployee from "@/app/components/forms/AddEmployee";

function Employee() {
  const router = useRouter();
  const dispatch = useDispatch();
  const businessUserData = useSelector(getUserData);

  const [getEmployeeData, setGetEmployeeData] = useState<any>(null);
  const [employeeList, setEmployeeList] = useState<any>(null);
  useEffect(() => {
    apicall({
      path: "employees/list",
      getResponse: (res) => {
        setEmployeeList(res.data.employees);
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);
  return (
    <div className="flex flex-col xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
      {/* <div className="absolute z-[0] bg-black/20 h-full w-full rounded-md backdrop-blur-md blur-xl" /> */}
      <div className="relative xsm:w-[95%]   md:w-[40%] z-1 mb-10 ">
        <div className="flex  ml-[-10px] items-center">
          <ChevronLeft
            onClick={() => {
              router.push("/" + businessUserData.slug);
            }}
            className="text-foreground cursor-pointer"
          />
          <p className="text-xl text-foreground ">Add Employee</p>
        </div>
        <AddEmployee
          getEmployee={(e: any) => {
            setGetEmployeeData(e);
          }}
          empData={getEmployeeData}
          addEmployeeToList={(e) => {
            if (getEmployeeData) {
              let emps: any[] = employeeList;
              const index = emps.indexOf(getEmployeeData);
              emps.splice(index, 1, e);
              setEmployeeList([...emps]);

              return;
            }

            if (employeeList && (employeeList as any[]).length >= 0) {
              let members: any[] = employeeList;

              members.push(e);
              setEmployeeList([...members]);
            }
          }}
        />
      </div>
      <div className="relative xsm:w-[95%]   md:w-[50%] z-1 mb-10">
        <p className="text-xl text-textPrimary dark:text-textPrimary">
          Employee List
        </p>
        <EmployeeList
          getEmployee={(e: any) => {
            setGetEmployeeData(e);
          }}
          employeeList={employeeList}
        />
      </div>
    </div>
  );
}

export default Employee;
