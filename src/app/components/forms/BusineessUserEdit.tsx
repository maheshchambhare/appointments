"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { apicall } from "@/utils/getdata";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGrp";
import { Label } from "../ui/Label";

const BusineessUserEdit = ({
  id,
  approved,
  members,
  setOpen,
}: {
  id: string;
  approved: boolean;
  members: number;
  setOpen: (e: any) => void;
}) => {
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          members: members,
          approved: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          apicall({
            path: "superadmin/businessuseredit",
            getResponse: (res) => {
              //   router.push("/superadmin/businessusers");
              setOpen(false);
            },
            getError: (err) => {},
            router,
            method: "post",
            data: {
              id: id,
              member: values.members,
              approve: values.approved == "yes",
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
                type="number"
                name="members"
                label="Members"
                id="members"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.members}
                error={errors.members}
                touched={touched.members}
              />
            </div>

            <div className="my-4 w-full">
              <p className="mb-2 font-poppins text-white">Approve</p>
              <RadioGroup
                onValueChange={(e) => {
                  values.approved = e;
                }}
                className="flex flex-wrap"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex ml-4 items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-2">
              <Button type="submit" title="Submit" onClick={() => {}} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BusineessUserEdit;
