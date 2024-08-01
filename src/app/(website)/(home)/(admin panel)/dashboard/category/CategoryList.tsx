"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

import React, { useEffect, useState } from "react";

function CategoryList({
  categoryList,
  setCategory,
}: {
  categoryList: any;
  setCategory: any;
}) {
  if (categoryList == null) {
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
      {categoryList.length == 0 ? (
        <p>No category found</p>
      ) : (
        categoryList.map((cat: any, ind: any) => {
          return (
            <Card
              key={ind}
              className="sm:col-span-1"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="p-3 flex flex-col justify-center items-center">
                <CardTitle className="font-poppins text-[20px]  font-semibold text-center">
                  {cat.name}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <button
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                  }}
                  className="inline-flex w-full  h-12 text-foreground  text-base items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#eee,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <Pencil size={16} className="mr-2" />
                  Edit
                </button>
              </CardFooter>
            </Card>
          );
        })
      )}
    </div>
  );
}

export default CategoryList;
