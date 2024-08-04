import { apicall } from "@/utils/getdata";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomInput from "../CustomInput";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { getdisablememberAdd } from "@/store/slices/commonSlices";
import { Bounce, toast } from "react-toastify";
import GetCroppedImg from "../utils/GetCroppedImg";
import imageCompression from "browser-image-compression";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { Camera } from "lucide-react";
import Image from "next/image";
import Loader from "../ui/Loader";
import Cropper from "react-easy-crop";

const isValidURL = (url: any) => {
  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return urlPattern.test(url);
};

function formatBytes(bytes: any, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function AddEmployee({
  addEmployeeToList,
  empData,
  getEmployee,
}: {
  addEmployeeToList: (e: any) => void;
  getEmployee: (e: any) => void;
  empData: any;
}) {
  const avatarRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [cropedAvatarImage, setCropAvatarImage] = useState<any>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [compressLoader, setCompressLoader] = useState<boolean>(false);
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const [loader, setLoader] = useState<boolean>(false);
  const disableAdd = useSelector(getdisablememberAdd);
  const router = useRouter();

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    setCompressLoader(true);
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const croppedImage = await GetCroppedImg(
        window.URL.createObjectURL(selectedProfile),
        croppedAreaPixels,
        rotation
      );
      const compressFile = async (file: any, selectedFile: any) => {
        let filename = selectedFile.name;
        let parts = filename.split(".");
        parts.pop();
        let filenameWithExt = parts.join(".") + ".webp";
        try {
          const data = await imageCompression(file, options).then((f) => {
            Object.assign(f, {
              preview: window.URL.createObjectURL(f),
              originalPreview: window.URL.createObjectURL(file),
              formattedSize: formatBytes(f.size),
              originalSize: formatBytes(selectedFile.size),
              name: filenameWithExt,
              compressed: true,
            });

            setCropAvatarImage(f);

            setTimeout(() => {
              setCompressLoader(false);
            }, 200);
          });
        } catch (e) {
          console.log(e);
        }
      };

      compressFile(croppedImage, selectedProfile);

      setCloseModal(true);
      setSelectedProfile(null);

      setTimeout(() => {
        setCloseModal(false);
      }, 300);
      //   setOpen(false);

      // setmodal_xlarge(!modal_xlarge);
    } catch (e) {
      console.error(e);
      setCompressLoader(false);
    }
  }, [croppedAreaPixels, rotation]);

  useEffect(() => {
    setLoader(true);

    setCropAvatarImage(empData ? empData.avatar : null);

    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, [empData]);

  if (loader) {
    return (
      <div className="flex h-full w-full justify-center items-center">
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
      <div className=" relative mt-[30px]">
        <label
          className={`font-sans  text-md  font-medium  transition-all duration-200 ease-in-out left-4 text-foreground`}
        >
          Employee Avatar
        </label>

        <Modal>
          <ModalTrigger
            closeModal={closeModal}
            className="bg-background dark:text-black text-white flex justify-center group/modal-btn"
          >
            <div className="group  w-[86px] mt-4  shadow-md relative cursor-pointer overflow-hidden  mb-4 h-[86px] rounded-full bg-slate-500 ml-[20px]">
              <div className=" w-full h-full bg-headerbg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <input
                  ref={avatarRef}
                  autoComplete="off"
                  type="file"
                  id="fullName"
                  accept="image/png, image/jpeg,image/jpg"
                  className="opacity-0 h-full  w-full absolute z-50 cursor-pointer"
                  onChange={(e: any) => {
                    setSelectedProfile(e.target.files[0]);
                    //   setShowModel(true);
                  }}
                />

                <Camera
                  size={35}
                  className="m-auto absolute top-[2px] left-6  mt-6 text-foreground"
                  onClick={() => {
                    if (avatarRef.current) avatarRef.current.click();
                  }}
                />
              </div>

              {isValidURL(cropedAvatarImage) ? (
                <Image
                  className={`rounded-2xl aspect-[1/1]  h-auto object-cover absolute top-0 	group-hover:opacity-10 ease-in-out transition-all duration-300 `}
                  height={86}
                  width={86}
                  alt="images"
                  src={cropedAvatarImage}
                />
              ) : cropedAvatarImage !== null ? (
                <Image
                  className={`rounded-2xl aspect-[1/1]  h-auto object-cover absolute top-0 	group-hover:opacity-10 ease-in-out transition-all duration-300 `}
                  height={86}
                  width={86}
                  alt="images"
                  src={window.URL.createObjectURL(cropedAvatarImage)}
                />
              ) : (
                <Image
                  className={`rounded-2xl aspect-[1/1]  h-auto object-cover absolute top-0 	group-hover:opacity-10 ease-in-out transition-all duration-300 `}
                  height={86}
                  width={86}
                  alt="images"
                  src={"/logo.webp"}
                />
              )}
            </div>
          </ModalTrigger>
          {selectedProfile && (
            <ModalBody>
              <ModalContent>
                <div className="px-6 py-4 min-h-[300px] h-auto w-full flex justify-center items-center overflow-hidden relative">
                  {compressLoader ? (
                    <div className="h-full w-full right-0 bg-opacity-[0.6] left-0 bg-white z-50  absolute top-0 bottom-0 flex justify-center items-center content-center">
                      <Loader />
                    </div>
                  ) : (
                    <Cropper
                      image={
                        selectedProfile &&
                        window?.URL.createObjectURL(selectedProfile)
                      }
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      cropShape={"rect"}
                      onCropChange={(c) => {
                        setCrop(c);
                      }}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  )}
                </div>
              </ModalContent>
              <ModalFooter className="gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setCloseModal(true);
                    setSelectedProfile(null);
                    setTimeout(() => {
                      setCloseModal(false);
                    }, 200);
                  }}
                  className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={showCroppedImage}
                  className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                >
                  Crop{" "}
                </button>
              </ModalFooter>
            </ModalBody>
          )}
        </Modal>
      </div>
      <Formik
        initialValues={{
          name: empData ? empData.name : "",
          mobile: empData ? Number(empData.mobile) : "",
          designation: empData ? empData.designation : "",
          // password: "",
          // cnfPassword: "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.designation) {
            errors.designation = "Required";
          }
          if (!values.mobile) {
            errors.mobile = "Required";
          } else if (JSON.stringify(values.mobile).length != 10) {
            errors.mobile = "Invalid mobile number";
          }

          // if (!values.password) {
          //   errors.password = "Password is required";
          // } else if (values.password.length < 8) {
          //   errors.password = "Password must be at least 8 characters long";
          // } else if (!/(?=.*[a-z])/.test(values.password)) {
          //   errors.password =
          //     "Password must contain at least one lowercase letter";
          // } else if (!/(?=.*[A-Z])/.test(values.password)) {
          //   errors.password =
          //     "Password must contain at least one uppercase letter";
          // } else if (!/(?=.*\d)/.test(values.password)) {
          //   errors.password = "Password must contain at least one digit";
          // } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
          //   errors.password =
          //     "Password must contain at least one special character";
          // }

          // if (!values.cnfPassword) {
          //   errors.cnfPassword = "Please confirm your password";
          // } else if (values.password !== values.cnfPassword) {
          //   errors.cnfPassword = "Passwords do not match";
          // }

          return errors;
        }}
        onSubmit={(values: any, { setSubmitting, resetForm }) => {
          const data = new FormData();

          data.append("name", values.name);
          data.append("mobile", values.mobile);
          data.append("designation", values.designation);

          if (!isValidURL(cropedAvatarImage) && cropedAvatarImage != null) {
            data.append("avatar", cropedAvatarImage, cropedAvatarImage.name);
          } else if (cropedAvatarImage == null) {
            toast("employee avatar is required, Please upload avatar", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              type: "error",
              transition: Bounce,
            });
            window.scroll({ top: 0, behavior: "smooth" });
            return;
          } else {
            data.append("avatar", cropedAvatarImage);
          }

          if (empData) {
            data.append("id", empData.id);
          }
          // const data = {
          //   name: values.name,
          //   mobile: JSON.stringify(values.mobile),
          //   password: values.password,
          // };

          apicall({
            path: empData ? "employees/edit" : "employees/add",
            getResponse: (res) => {
              addEmployeeToList(res.data.data);
              getEmployee(null);
              setCropAvatarImage(null);
              resetForm();
              toast(`Employee ${empData ? "updated" : "added"}  successfully`, {
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
            method: empData ? "put" : "post",
            data,
            contentType: "multipart/form-data",
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

            <div className="mt-4">
              <CustomInput
                type="text"
                name="designation"
                label="Designation"
                id="designation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.designation}
                error={errors.designation}
                touched={touched.designation}
                required
              />
            </div>

            {/* <div className="my-4">
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
            </div> */}

            <div className="mb-2 mt-4">
              <Button type="submit" title="Add Employee" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddEmployee;
