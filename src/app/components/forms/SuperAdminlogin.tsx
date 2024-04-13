"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apicall } from "@/utils/getdata";
import useFcmToken from "../utils/firebase/useFcmToken";

const SuperAdminlogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          password: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.password) {
            errors.password = "Password is required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          apicall({
            path: "superadmin/login",
            getResponse: (res) => {
              router.push("/superadmin/businessusers");
            },
            getError: (err) => {},
            router,
            method: "post",
            data: {
              name: values.name,
              password: values.password,
              fcmToken,
            },
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
                type="name"
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

            <div className="my-4">
              <CustomInput
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                passwordEye={(e) => {
                  setShowPassword(e);
                }}
              />
            </div>

            <div className="mb-2">
              <Button type="submit" title="Login" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SuperAdminlogin;
