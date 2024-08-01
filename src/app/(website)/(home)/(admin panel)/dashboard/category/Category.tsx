"use client";
import React, { useEffect, useState } from "react";
import MembersList from "./CategoryList";
import AddMembers from "@/app/components/forms/AddMembers";
import { apicall } from "@/utils/getdata";
import { setdisablememberAdd } from "@/store/slices/commonSlices";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { getUserData } from "@/store/slices/authSlice";
import AddCategory from "@/app/components/forms/AddCategory";
import CategoryList from "./CategoryList";
import { Bounce, toast } from "react-toastify";

function Category() {
  const router = useRouter();
  const dispatch = useDispatch();
  const businessUserData = useSelector(getUserData);

  const [categoryList, setCategoryList] = useState<any>(null);
  const [getCategoryData, setGetCategoryData] = useState<any>(null);
  useEffect(() => {
    apicall({
      path: "category/list",
      getResponse: (res) => {
        setCategoryList(res.data.categories);
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);
  return (
    <div className="flex flex-col min-h-[100vh] xsm:flex-col md:flex-row relative mx-auto   w-full mt-10 justify-between ">
      {/* <div className="absolute z-[0] bg-black/20 h-full w-full rounded-md backdrop-blur-md blur-xl" /> */}
      <div className="relative xsm:w-[95%]   md:w-[40%] z-1 mb-10 ">
        <div className="flex  ml-[-10px] items-center">
          <ChevronLeft
            onClick={() => {
              router.push("/" + businessUserData.slug);
            }}
            className="text-foreground cursor-pointer"
          />
          <p className="text-xl text-foreground ">Add Category</p>
        </div>
        <AddCategory
          getCategory={getCategoryData}
          setCategory={(e: any) => {
            setGetCategoryData(e);
          }}
          addCategoryToList={(e) => {
            if (getCategoryData) {
              let cats: any[] = categoryList;
              const index = cats.indexOf(getCategoryData);
              cats.splice(index, 1, e);
              setCategoryList([...cats]);

              return;
            }
            if (categoryList && (categoryList as any[]).length >= 0) {
              let cats: any[] = categoryList;

              cats.push(e);
              setCategoryList([...cats]);
            }
          }}
        />
      </div>
      <div className="relative xsm:w-[95%]   md:w-[50%] z-1 mb-10">
        <p className="text-xl text-textPrimary dark:text-textPrimary">
          Category List
        </p>
        <CategoryList
          setCategory={(e: any) => {
            setGetCategoryData(e);
          }}
          categoryList={categoryList}
        />
      </div>
    </div>
  );
}

export default Category;
