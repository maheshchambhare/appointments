"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function OurTeam({ website }: any) {
  const router = useRouter();

  const [employeeList, setEmployeeList] = useState<any>(null);
  useEffect(() => {
    apicall({
      path: "employees/list",
      getResponse: (res) => {
        setEmployeeList(res.data.employees);
      },
      getError: (err) => {},
      router,
      method: "post",
      data: {
        businessUserId: website.businessUserId,
      },
    });
  }, []);

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
    <div
      id="team"
      className="h-auto w-full mx-auto  my-[100px] overflow-hidden  "
    >
      <h2 className="text-foreground font-poppins font-bold text-4xl text-center ">
        Our Team
      </h2>
      <p className="max-w-[600px] text-sm  md:text-base text-center text-muted-foreground mx-auto">
        Meet the heart and soul of {website.businessName} – our incredible team
        of professionals. Each member brings a unique blend of talent, passion,
        and expertise, driving us to deliver the best results for our clients
      </p>

      <div className="grid gap-4 grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-10">
        {employeeList &&
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
                  <CardTitle className="font-poppins text-xl  font-semibold text-center">
                    {emp.name}
                  </CardTitle>
                  <CardDescription>Hair Stylist</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default OurTeam;
