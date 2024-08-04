import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import CustomTextArea from "@/app/components/CustomTextArea";
import { useSelector } from "react-redux";
import { getUserData } from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import { Bounce, ToastContainer, toast } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../ui/Loader";

interface timeselector {
  startTime: Date | null;
  endTime: Date | null;
  breakTimeStart: Date | null;
  breakTimeEnd: Date | null;
}

const Profile = () => {
  const router = useRouter();

  const businessUser = useSelector(getUserData);
  const [user, setUser] = useState<any>(null);
  const [loader, setLoader] = useState(true);

  const [timeSelector, setTimeSelector] = useState<timeselector>({
    startTime: moment("09:00:00", "HH:mm:ss").toDate(),
    endTime: moment("18:00:00", "HH:mm:ss").toDate(),
    breakTimeStart: moment("13:00:00", "HH:mm:ss").toDate(),
    breakTimeEnd: moment("14:00:00", "HH:mm:ss").toDate(),
  });

  const [dayOfWeek, setDaysOfWeek] = useState([
    { id: 0, days: "S", name: "Sunday", isActive: false },
    { id: 1, days: "M", name: "Monday", isActive: false },
    { id: 2, days: "T", name: "Tuesday", isActive: false },
    { id: 3, days: "W", name: "Wednesday", isActive: false },
    { id: 4, days: "T", name: "Thursday", isActive: false },
    { id: 5, days: "F", name: "Friday", isActive: false },
    { id: 6, days: "S", name: "Saturday", isActive: false },
  ]);

  const [dayOfWeekErr, setDayOfWeekErr] = useState("");

  useEffect(() => {
    setLoader(true);
    apicall({
      path: "getbusinessuser",
      getResponse: (res) => {
        if (res.data.weekdays) {
          setDaysOfWeek(res.data.weekdays);
        }

        setUser(res.data);
        if (res.data.startTime) {
          setTimeSelector({
            startTime: moment(res.data.startTime).toDate(),
            endTime: moment(res.data.endTime).toDate(),
            breakTimeStart: moment(res.data.breakTimeStart).toDate(),
            breakTimeEnd: moment(res.data.breakTimeEnd).toDate(),
          });
        }
        setLoader(false);
      },
      getError: (err) => {},
      router,
      method: "get",
    });
  }, []);

  if (loader && user == null) {
    return (
      <div className="flex h-[80vh]  justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Formik
        initialValues={{
          name: user?.name || "",
          businessName: user?.businessName || "",
          mobile: user?.mobile || "",
          address: user?.address || "",
          email: user?.email || "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.businessName) {
            errors.businessName = "Required";
          } else if (values.businessName.length > 20) {
            errors.businessName = "Business name is too long";
          }

          if (!values.mobile) {
            errors.mobile = "Required";
          } else if (
            typeof values.mobile == "string"
              ? values.mobile.length != 10
              : JSON.stringify(values.mobile).length != 10
          ) {
            errors.mobile = "Invalid mobile number";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            ...values,
            mobile:
              typeof values.mobile == "string"
                ? values.mobile
                : JSON.stringify(values.mobile),
          };

          apicall({
            path: "editprofile",
            getResponse: (res) => {
              toast("Your profile updated successfully", {
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
              toast("something failed on server, contact admin", {
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
                // isDisabled={true}
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
                // isDisabled={true}
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
                // isDisabled={true}
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
            {/* <div className="my-4">
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
            </div> */}

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

            {/* <div className="w-full max-w-[450px]  my-[10px]">
              <div className="w-full flex justify-between ">
                <div>
                  <label
                    className={`font-sans text-foreground text-md  font-medium  transition-all duration-200 ease-in-out left-4`}
                  >
                    Select available days
                  </label>
                </div>
                <div>
                  <label
                    onClick={() => {
                      dayOfWeek.map((d, i) => {
                        d.isActive = true;
                      });
                      setDaysOfWeek([...dayOfWeek]);
                    }}
                    className={`font-sans text-md text-foreground font-medium  transition-all duration-200 ease-in-out left-4`}
                  >
                    Select All
                  </label>
                </div>
              </div>
              <div className="weekDays-selector">
                {dayOfWeek?.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="inline-flex items-center">
                        <label
                          className="relative flex cursor-pointer items-center rounded-full p-3"
                          htmlFor="checkbox"
                          data-ripple-dark="true"
                        >
                          <input
                            type="checkbox"
                            className="before:content[''] peer relative h-[40px] w-[40px] cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-background before:opacity-0 before:transition-opacity checked:border-foreground checked:bg-foreground checked:before:bg-foreground hover:before:opacity-10"
                            id={data.name}
                            onClick={(e) => {
                              data.isActive = !data.isActive;
                              setDaysOfWeek([...dayOfWeek]);
                            }}
                            checked={data.isActive}
                            defaultChecked={data.isActive}
                          />
                          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4  transition-opacity peer-checked:opacity-100">
                            <label
                              className={`${
                                data.isActive
                                  ? "text-background"
                                  : "text-textSecondary"
                              }`}
                              htmlFor={data.name}
                            >
                              {data.days}
                            </label>
                          </div>
                        </label>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="my-[20px] w-full  flex justify-between md:justify-start">
                <div className="flex flex-col w-[47%] my-[5px]  md:mr-4">
                  <div className="mb-2">
                    <label
                      className={`font-sans text-md  text-foreground font-medium  transition-all duration-200 ease-in-out left-4 `}
                      htmlFor="startTime"
                    >
                      Start Time
                    </label>
                    <span className="text-red-600"> *</span>
                  </div>
                  <DatePicker
                    id={"startTime"}
                    selected={timeSelector.startTime}
                    onChange={(e) => {
                      timeSelector.startTime = e;
                      setTimeSelector({ ...timeSelector });
                    }}
                    showTimeSelect
                    className="h-[40px] text-md bg-background  text-foreground dark:text-foreground dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>

                <div className="flex flex-col w-[47%] my-[5px]  ">
                  <div className="mb-2">
                    <label
                      className={`font-sans text-md text-foreground font-medium  transition-all duration-200 ease-in-out left-4 `}
                      htmlFor="startTime"
                    >
                      End Time
                    </label>
                    <span className="text-red-600"> *</span>
                  </div>
                  <DatePicker
                    id={"endTime"}
                    selected={timeSelector.endTime}
                    onChange={(e) => {
                      timeSelector.endTime = e;
                      setTimeSelector({ ...timeSelector });
                    }}
                    showTimeSelect
                    className="h-[40px] text-md bg-background  text-foreground dark:text-foreground dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>
              </div>

              <div className="my-[20px] w-full flex justify-between md:justify-start">
                <div className="flex flex-col w-[47%] my-[5px]  md:mr-4">
                  <div className="mb-2">
                    <label
                      className={`font-sans text-md text-foreground  font-medium  transition-all duration-200 ease-in-out left-4 `}
                      htmlFor="startTime"
                    >
                      Break Start Time
                    </label>
                    <span className="text-red-600"> *</span>
                  </div>
                  <DatePicker
                    id={"startTime"}
                    selected={timeSelector.breakTimeStart}
                    onChange={(e) => {
                      timeSelector.breakTimeStart = e;
                      setTimeSelector({ ...timeSelector });
                    }}
                    showTimeSelect
                    className="h-[40px] text-md bg-background  text-foreground dark:text-foreground dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>

                <div className="flex flex-col w-[47%] my-[5px]  ">
                  <div className="mb-2">
                    <label
                      className={`font-sans text-md text-foreground  font-medium  transition-all duration-200 ease-in-out left-4 `}
                      htmlFor="startTime"
                    >
                      Break End Time
                    </label>
                    <span className="text-red-600"> *</span>
                  </div>
                  <DatePicker
                    id={"endTime"}
                    selected={timeSelector.breakTimeEnd}
                    onChange={(e) => {
                      timeSelector.breakTimeEnd = e;
                      setTimeSelector({ ...timeSelector });
                    }}
                    showTimeSelect
                    className="h-[40px] text-md bg-background  text-foreground dark:text-foreground dark:bg-background rounded-[7px] p-[10px] w-full border-[1px] border-[#ced4da] sm:text-sm xsm:text-sm"
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm mt-[5px] text-red-500">{dayOfWeekErr}</p>
              </div>
            </div> */}

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
