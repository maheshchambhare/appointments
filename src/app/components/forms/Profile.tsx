import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import CustomTextArea from "@/app/components/CustomTextArea";
import { useSelector } from "react-redux";
import { getUserData } from "@/store/slices/authSlice";
import Cookies from "js-cookie";

const Profile = () => {
  const router = useRouter();

  const businessUser = useSelector(getUserData);

  return (
    <div>
      <Formik
        initialValues={{
          name: businessUser.name || "",
          businessName: businessUser.businessName || "",
          mobile: businessUser.mobile || "",
          about: businessUser.about || "",
          address: businessUser.address || "",
        }}
        validate={(values) => {
          const errors: any = {};

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            about: values.about,
            address: values.address,
          };

          apicall({
            path: "editprofile",
            getResponse: (res) => {
              const business = {
                ...businessUser,
                about: data.about,
                address: data.address,
              };
              Cookies.set("businessUser", JSON.stringify(business));
            },
            getError: (err) => {},
            router,
            method: "post",
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
                isDisabled={true}
              />
            </div>
            <div className="my-4">
              <CustomInput
                type="text"
                name="businessName"
                label="Business Name"
                id="businessName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.businessName}
                error={errors.businessName}
                touched={touched.businessName}
                isDisabled={true}
              />
            </div>
            <div className="my-4">
              <CustomInput
                type="number"
                name="mobile"
                label="Mobile"
                id="mobile"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobile}
                error={errors.mobile}
                touched={touched.mobile}
                isDisabled={true}
              />
            </div>
            <div className="my-4">
              <CustomTextArea
                name="about"
                inputLabel="About Us"
                inputId="about"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
                inputError={errors.about}
                inputTouched={touched.about}
              />
            </div>

            <div className="my-4">
              <CustomTextArea
                name="address"
                inputLabel="Address"
                inputId="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                inputError={errors.address}
                inputTouched={touched.address}
              />
            </div>

            <div className="mb-6">
              <Button type="submit" title="Submit" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
