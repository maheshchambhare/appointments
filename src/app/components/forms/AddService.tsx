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
import { RadioGroup, RadioGroupItem } from "../ui/RadioGrp";
import { Label } from "../ui/Label";

interface selecteddur {
  hours: number;
  minutes: number;
}

function AddService({
  addPackageToList,
}: {
  addPackageToList: (e: any) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const disableAdd = useSelector(getdisablememberAdd);
  const router = useRouter();

  const hoursRef: any = useRef(null);
  const minutesRef: any = useRef(null);

  const [durationErr, setDurationErr] = useState("");
  const [durationFemaleErr, setDurationFemaleErr] = useState("");

  const [selectedDuration, setSelectedDuration] = useState<selecteddur>({
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
          price: "",
          gender: "",
        }}
        validate={(values) => {
          const errors: any = {};
          console.log("XXXX");

          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.gender) {
            errors.gender = "Required";
          }

          if (!values.price) {
            errors.price = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values, "CCCC");
          if (selectedDuration.hours === 0 && selectedDuration.minutes === 0) {
            setDurationErr("Duration is required");

            return;
          } else {
            setDurationErr("");
          }

          const data = {
            ...values,
            duration: selectedDuration,
          };

          apicall({
            path: "service/add",
            getResponse: (res) => {
              addPackageToList(data);
              resetForm();
              setSelectedDuration({
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
              window.location.reload();

              // console.log(hoursRef.current, minutesRef, "POPOPOP");

              // if (hoursRef) {
              //   hoursRef.current.clearValue();
              // }

              // if (minutesRef) {
              //   minutesRef.current.clearValue();
              // }
            },
            getError: (err) => {
              console.log(err, "Error");
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
          <form
            onSubmit={(e) => {
              console.log("Hello");
              handleSubmit(e);
            }}
          >
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

            <div className="mt-4 w-full">
              <p className="mb-2 font-poppins text-white">
                Gender <span className="text-red-500">*</span>
              </p>
              <RadioGroup
                onValueChange={(e) => {
                  errors.gender = "";
                  values.gender = e;
                }}
                className="flex flex-wrap "
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label className="text-textPrimary" htmlFor="male">
                    Male
                  </Label>
                </div>
                <div className="flex ml-4 items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label className="text-textPrimary" htmlFor="female">
                    Female
                  </Label>
                </div>
                <div className="flex ml-4 items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label className="text-textPrimary" htmlFor="other">
                    Other
                  </Label>
                </div>
              </RadioGroup>

              {errors.gender && (
                <p className=" font-poppins mt-1 text-[10px] mb-[-10px] text-[#f46a6a]">
                  {errors.gender}
                </p>
              )}
            </div>

            <div className="mt-4 w-full">
              <div className="flex flex-col w-full">
                <label
                  className={`font-sans text-md text-textPrimary font-medium  transition-all duration-200 ease-in-out left-4`}
                >
                  Duration of Service
                </label>{" "}
                <div className="flex  w-full justify-between md:justify-start mt-[5px] ">
                  <div className="w-[47%]  md:mr-4">
                    <div className="col-md-12">
                      <MultiSelectComp
                        full={true}
                        refSelect={hoursRef}
                        title="Hours"
                        onChange={(e: any) => {
                          selectedDuration.hours = e.value;
                          setSelectedDuration({ ...selectedDuration });
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
                          selectedDuration.minutes = e.value;
                          setSelectedDuration({ ...selectedDuration });
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
                  <p className="text-sm mt-[5px] text-red-500">{durationErr}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-6 flex justify-between items-center">
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
                required
              />
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

export default AddService;
