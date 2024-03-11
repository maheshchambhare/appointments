import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";

const ResetPassword = ({
  resetForm,
  setotpform,
}: {
  resetForm: (val: boolean) => void;
  setotpform: (val: boolean) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  return (
    <div>
      <Formik
        initialValues={{
          mobile: "",
          password: "",
          cnfPassword: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.mobile) {
            errors.mobile = "Required";
          } else if (values.mobile.length != 10) {
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
          setotpform(true);
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
                type="mobile"
                name="mobile"
                label="Mobile"
                id="mobile"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobile}
                error={errors.mobile}
                touched={touched.mobile}
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

            <div className="mt-4 mb-6">
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
              />
            </div>

            <div className="mb-2 flex justify-between w-full">
              <Button
                type="submit"
                onClick={handleSubmit}
                title="Reset Password"
              />
              <Button
                type="button"
                onClick={() => {
                  resetForm(false);
                }}
                title="Go Back"
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
