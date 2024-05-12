import { apicall } from "@/utils/getdata";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { getdisablememberAdd } from "@/store/slices/commonSlices";
import { Bounce, toast } from "react-toastify";
import MultiSelectComp from "../MultiSelectComp";

interface selecteddur {
  hours: number;
  minutes: number;
}

function AddPackage({
  addPackageToList,
}: {
  addPackageToList: (e: any) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const disableAdd = useSelector(getdisablememberAdd);
  const router = useRouter();

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  const [durationMaleErr, setDurationMaleErr] = useState("");
  const [durationFemaleErr, setDurationFemaleErr] = useState("");

  const [selectedDurationMale, setSelectedDurationMale] = useState<selecteddur>(
    {
      hours: 0,
      minutes: 0,
    }
  );

  const [selectedDurationFemale, setSelectedDurationFemale] =
    useState<selecteddur>({
      hours: 0,
      minutes: 0,
    });

  const hoursArr = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
  ];

  const minutesArr = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 35,
      label: "35",
    },
    {
      value: 40,
      label: "40",
    },
    {
      value: 45,
      label: "45",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 55,
      label: "55",
    },
  ];

  return (
    <div className="max-w-[400px]">
      <Formik
        initialValues={{
          name: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (
            selectedDurationMale.hours === 0 &&
            selectedDurationMale.minutes === 0
          ) {
            setDurationMaleErr("Duration is required");

            return;
          } else {
            setDurationMaleErr("");
          }

          if (
            selectedDurationFemale.hours === 0 &&
            selectedDurationFemale.minutes === 0
          ) {
            setDurationFemaleErr("Duration is required");

            return;
          } else {
            setDurationFemaleErr("");
          }
          const data = {
            name: values.name,
            durationMale: selectedDurationMale,
            durationFemale: selectedDurationFemale,
          };

          apicall({
            path: "package/add",
            getResponse: (res) => {
              addPackageToList(data);
              resetForm();
              setSelectedDurationMale({
                hours: 0,
                minutes: 0,
              });
              toast("Package added successfully", {
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
              />
            </div>

            {/* <div className="mt-4">
              <CustomInput
                type="number"
                name="price"
                label="Price"
                id="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                error={errors.price}
                touched={touched.price}
              />
            </div> */}

            <div className="my-[20px] w-full">
              <div className="flex flex-col w-full">
                <label
                  className={`font-sans text-md text-textPrimary font-medium  transition-all duration-200 ease-in-out left-4`}
                >
                  Duration of Package For Male
                </label>{" "}
                <div className="flex  w-full justify-between md:justify-start mt-[5px] ">
                  <div className="w-[47%]  md:mr-4">
                    <div className="col-md-12">
                      <MultiSelectComp
                        full={true}
                        refSelect={hoursRef}
                        title="Hours"
                        onChange={(e: any) => {
                          selectedDurationMale.hours = e.value;
                          setSelectedDurationMale({ ...selectedDurationMale });
                        }}
                        isMulti={false}
                        required={true}
                        placeholder="Hours"
                        options={hoursArr !== null ? hoursArr : []}
                        defaultValue={{
                          label: "0",
                          value: "0",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-[47%] ">
                    <div className="w-full ">
                      <MultiSelectComp
                        full={true}
                        title="Minutes"
                        refSelect={minutesRef}
                        required={true}
                        onChange={(e: any) => {
                          selectedDurationMale.minutes = e.value;
                          setSelectedDurationMale({ ...selectedDurationMale });
                        }}
                        isMulti={false}
                        placeholder="Minutes"
                        options={minutesArr !== null ? minutesArr : []}
                        defaultValue={{
                          label: "0",
                          value: "0",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm mt-[5px] text-red-500">
                    {durationMaleErr}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-[20px] w-full">
              <div className="flex flex-col w-full">
                <label
                  className={`font-sans text-md text-textPrimary font-medium  transition-all duration-200 ease-in-out left-4`}
                >
                  Duration of Package For Female
                </label>{" "}
                <div className="flex  w-full justify-between md:justify-start mt-[5px] ">
                  <div className="w-[47%]  md:mr-4">
                    <div className="col-md-12">
                      <MultiSelectComp
                        full={true}
                        refSelect={hoursRef}
                        title="Hours"
                        onChange={(e: any) => {
                          selectedDurationFemale.hours = e.value;
                          setSelectedDurationFemale({
                            ...selectedDurationFemale,
                          });
                        }}
                        isMulti={false}
                        required={true}
                        placeholder="Hours"
                        options={hoursArr !== null ? hoursArr : []}
                        defaultValue={{
                          label: "0",
                          value: "0",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-[47%] ">
                    <div className="w-full ">
                      <MultiSelectComp
                        full={true}
                        title="Minutes"
                        refSelect={minutesRef}
                        required={true}
                        onChange={(e: any) => {
                          selectedDurationFemale.minutes = e.value;
                          setSelectedDurationFemale({
                            ...selectedDurationFemale,
                          });
                        }}
                        isMulti={false}
                        placeholder="Minutes"
                        options={minutesArr !== null ? minutesArr : []}
                        defaultValue={{
                          label: "0",
                          value: "0",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm mt-[5px] text-red-500">
                    {durationFemaleErr}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <Button type="submit" title="Submit" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddPackage;
