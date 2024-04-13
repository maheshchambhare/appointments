import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apicall } from "@/utils/getdata";
import {
  setBusinessUserLoggedIn,
  setUserData,
  setUserType,
} from "@/store/slices/authSlice";
import { Bounce, toast } from "react-toastify";
import useFcmToken from "../utils/firebase/useFcmToken";
import moment from "moment";

const Login = ({
  resetForm,
  setIsOpen,
}: {
  resetForm: (val: boolean) => void;
  setIsOpen: (val: boolean) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  const router = useRouter();

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
        onSubmit={(values, { setSubmitting }) => {
          apicall({
            path: "login",
            getResponse: (res) => {
              // const sixMonthsFromNow = moment().add(6, "months").toDate();

              // console.log(sixMonthsFromNow, "XYZ");

              // Cookies.set("businessUser", JSON.stringify({ ...res.data }), {
              //   expires: sixMonthsFromNow,
              // });
              dispatch(setBusinessUserLoggedIn(true));
              dispatch(setUserData(res.data));
              dispatch(setUserType(res.data.userType));
              setIsOpen(false);
            },
            getError: (err) => {
              toast(err.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            },
            router,
            method: "post",
            data: {
              mobile: values.mobile,
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
            <p className="mt-4 text-textSecondary mb-6 text-sm">
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
              <Button type="submit" title="Login" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
