import { apicall } from "@/utils/getdata";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { getdisablememberAdd } from "@/store/slices/commonSlices";
import { Bounce, toast } from "react-toastify";
import Loader from "../ui/Loader";

function AddCategory({
  addCategoryToList,
  getCategory,
  setCategory,
}: {
  addCategoryToList: (e: any) => void;
  getCategory: any;
  setCategory: (e: any) => void;
}) {
  const router = useRouter();

  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, [getCategory]);

  if (loader) {
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
    <div>
      <Formik
        initialValues={{
          name: getCategory?.name || "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          let data: any = {
            name: values.name,
          };

          if (getCategory) {
            data.id = getCategory.id;
          }

          apicall({
            path: getCategory ? "category/edit" : "category/add",
            getResponse: (res) => {
              addCategoryToList(data);
              setCategory(null);
              resetForm();
              toast(
                `Category ${getCategory ? "updated" : "added"} successfully`,
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
            getError: (err) => {
              toast("Something failed on server", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "error",
                transition: Bounce,
              });
            },
            router,
            method: getCategory ? "put" : "post",
            data,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                name="name"
                label="Name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
                touched={touched.name}
              />
            </div>

            <div className="mb-2 mt-6">
              <Button type="submit" title="Add Category" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddCategory;
