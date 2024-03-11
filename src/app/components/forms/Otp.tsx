import React from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";

const Otp = () => (
  <div>
    <Formik
      initialValues={{
        otp: "",
      }}
      validate={(values) => {
        const errors: any = {};

        if (!values.otp) {
          errors.mobile = "Required";
        } else if (values.otp.length != 6) {
          errors.mobile = "Invalid otp";
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
          <div className="mt-4 mb-6">
            <CustomInput
              type="number"
              name="otp"
              label="OTP"
              id="otp"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.otp}
              error={errors.otp}
              touched={touched.otp}
            />
          </div>

          <div className="mb-2">
            <Button type="submit" onClick={handleSubmit} title="Verify" />
          </div>
        </form>
      )}
    </Formik>
  </div>
);

export default Otp;
