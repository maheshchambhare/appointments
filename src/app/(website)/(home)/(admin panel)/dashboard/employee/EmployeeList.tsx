"use client";
import { CardBody } from "@/app/components/ui/3d-card";
import AnimatedBtn from "@/app/components/ui/AnimatedBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "lucide-react";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function EmployeeList({
  employeeList,
  getEmployee,
}: {
  employeeList: any;
  getEmployee: any;
}) {
  if (employeeList == null) {
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
      {employeeList.length == 0 ? (
        <p>No employee found</p>
      ) : (
        employeeList.map((emp: any, ind: any) => {
          return (
            <Card
              key={ind}
              className="sm:col-span-1"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3 flex flex-col justify-center items-center">
                <Avatar className="mb-2">
                  <AvatarImage
                    className="h-[100px] w-[100px]"
                    src={emp.avatar}
                  />
                  <AvatarFallback>{emp.name}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-poppins  font-semibold text-center">
                  {emp.name}
                </CardTitle>
                <CardDescription>{emp?.designation}</CardDescription>
              </CardHeader>
              <CardContent>
                <button
                  type="button"
                  onClick={() => {
                    getEmployee(emp);
                  }}
                  className="inline-flex w-full  h-12 text-foreground  text-base items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#eee,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <Pencil size={16} className="mr-2" />
                  Edit
                </button>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

export default EmployeeList;
