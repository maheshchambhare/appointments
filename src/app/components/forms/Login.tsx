import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";

const Login = ({ resetForm }: { resetForm: (val: boolean) => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          mobile: "",
          password: "",
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

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {}}
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
            <p className="mt-4 mb-6 text-sm">
              Forgot your password? No worries!{" "}
              <span
                onClick={() => {
                  resetForm(true);
                }}
                className="text-primary cursor-pointer"
              >
                Click here to reset it.
              </span>
            </p>

            <div className="mb-2">
              <Button type="submit" onClick={handleSubmit} title="Login" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
