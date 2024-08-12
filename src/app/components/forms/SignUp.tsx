import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const SignUp = ({ closeModal }: { closeModal?: (val: boolean) => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          businessName: "",
          mobile: "",
          password: "",
          cnfPassword: "",
          email: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.businessName) {
            errors.businessName = "Required";
          } else if (values.businessName.length > 20) {
            errors.businessName = "Business name is too long";
          }

          if (!values.mobile) {
            errors.mobile = "Required";
          } else if (JSON.stringify(values.mobile).length != 10) {
            errors.mobile = "Invalid mobile number";
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
          } else if (!/(?=.*[a-z])/.test(values.password)) {
            errors.password =
              "Password must contain at least one lowercase letter";
          } else if (!/(?=.*[A-Z])/.test(values.password)) {
            errors.password =
              "Password must contain at least one uppercase letter";
          } else if (!/(?=.*\d)/.test(values.password)) {
            errors.password = "Password must contain at least one digit";
          } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
            errors.password =
              "Password must contain at least one special character";
          }

          if (!values.cnfPassword) {
            errors.cnfPassword = "Please confirm your password";
          } else if (values.password !== values.cnfPassword) {
            errors.cnfPassword = "Passwords do not match";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            name: values.name,
            businessName: values.businessName.trim(),
            verified: false,
            approved: true,
            mobile: JSON.stringify(values.mobile),
            password: values.password,
            email: values.email,
          };

          apicall({
            path: "signup",
            getResponse: (res) => {
              if (closeModal) closeModal(false);
              toast(
                "🥳 Sign up successful, you can login now using mobile and password",
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
              if (closeModal) closeModal(false);
              toast("Something failed on server, contact admin +918767431997", {
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
                required
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
                required
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
                required
              />
            </div>

            <div className="my-4">
              <CustomInput
                type="email"
                name="email"
                label="Email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                required
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
                required
              />
            </div>
            <div className="mt-4 mb-8">
              <CustomInput
                type={showCnfPassword ? "text" : "password"}
                name="cnfPassword"
                label="Confirm Password"
                id="cnfPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cnfPassword}
                error={errors.cnfPassword}
                touched={touched.cnfPassword}
                passwordEye={(e) => {
                  setShowCnfPassword(e);
                }}
                required
              />
            </div>
            <Button type="submit" title={"Business Signup"} />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
