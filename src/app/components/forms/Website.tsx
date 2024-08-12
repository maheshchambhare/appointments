import React, { useCallback, useEffect, useRef, useState } from "react";
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
import moment, { weekdays } from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../ui/Loader";
import imageCompression from "browser-image-compression";
import GetCroppedImg from "../utils/GetCroppedImg";
import Image from "next/image";
import { Camera } from "lucide-react";
import Cropper from "react-easy-crop";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";

import city from "@/utils/data/cities.json";
import state from "@/utils/data/states.json";
import country from "@/utils/data/country.json";
import MultiSelectComp from "../MultiSelectComp";

interface timeselector {
  startTime: Date | null;
  endTime: Date | null;
  breakTimeStart: Date | null;
  breakTimeEnd: Date | null;
}

const Website = () => {
  const router = useRouter();

  const businessUser = useSelector(getUserData);
  const [website, seWebsite] = useState<any>(null);
  const [loader, setLoader] = useState(true);
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const logoImageRef = useRef<any>(null);
  const heroImageRef = useRef<any>(null);
  const [cropedHeroImage, setCropHeroImage] = useState<any>(null);
  const [cropedLogoImage, setCropLogoImage] = useState<any>(null);
  const [compressLoader, setCompressLoader] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showModel, setShowModel] = useState(false);
  const [editImgType, setEditImgType] = useState(0);

  const [timeSelector, setTimeSelector] = useState<any>({
    startTime: moment("09:00:00", "HH:mm:ss").toDate(),
    endTime: moment("18:00:00", "HH:mm:ss").toDate(),
    breakTimeStart: null,
    breakTimeEnd: null,
  });

  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [addressArr, setAddressArr] = useState<any>({
    countryErr: "",
    stateErr: "",
    cityErr: "",
  });

  const [states, setStates] = useState<any>(null);
  const [cities, setCities] = useState<any>(null);

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

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const isValidURL = (url: any) => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlPattern.test(url);
  };
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

            if (editImgType == 1) {
              setCropLogoImage(f);
            } else {
              setCropHeroImage(f);
            }

            setTimeout(() => {
              setCompressLoader(false);
              setShowModel(false);
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
    apicall({
      path: "website/getdata",
      getResponse: (res) => {
        const website = res.data.website;
        if (website) {
          if (website.weekdays) {
            setDaysOfWeek(website.weekdays);
          }
          if (website.logo) setCropLogoImage(website.logo);
          if (website.heroImage) setCropHeroImage(website.heroImage);
          seWebsite(website);
          if (website.startTime) {
            setTimeSelector({
              startTime: moment(website.startTime).toDate(),
              endTime: moment(website.endTime).toDate(),
              breakTimeStart: null,
              breakTimeEnd: null,
            });
          }

          const citiesArr: any = city;

          const countryObj = country.find(
            (d: any, i: any) => d.label == website.country.value
          );
          const stateObj = state.find(
            (d: any, i: any) => d.label == website.state
          );
          const cityObj = citiesArr.find(
            (d: any, i: any) => d.label == website.city
          );
          setSelectedCountry(countryObj);
          setSelectedState(stateObj);
          setSelectedCity(cityObj);
        }

        setLoader(false);
      },
      getError: (err) => {
        setLoader(false);
      },
      router,
      method: "post",
      data: { slug: null },
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const statesFilter = state.filter(
        (st) => st.countryCode == selectedCountry.isoCode
      );

      setStates(statesFilter);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const citiesArr: any = city;
      const statesFilter = citiesArr.filter(
        (st: any) =>
          st.stateCode == selectedState.isoCode &&
          st.countryCode == selectedState.countryCode
      );

      setCities(statesFilter);
    }
  }, [selectedState]);

  if (loader) {
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
      <div className=" relative mt-[30px]">
        <label
          className={`font-sans  text-md  font-medium  transition-all duration-200 ease-in-out left-4 text-foreground`}
        >
          Upload Logo <span className="text-red-500">*</span>
        </label>

        <Modal>
          <ModalTrigger
            closeModal={closeModal}
            className="bg-background dark:text-black text-white flex justify-center group/modal-btn"
          >
            <div className="group  w-[86px] mt-4  shadow-md relative cursor-pointer overflow-hidden  mb-4 h-[86px] rounded-full bg-slate-500 ml-[20px]">
              <div className=" w-full h-full bg-headerbg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <input
                  ref={logoImageRef}
                  autoComplete="off"
                  type="file"
                  id="fullName"
                  accept="image/png, image/jpeg,image/jpg"
                  className="opacity-0 h-full  w-full absolute z-40 cursor-pointer"
                  onChange={(e: any) => {
                    setEditImgType(1);
                    setSelectedProfile(e.target.files[0]);
                    //   setShowModel(true);
                  }}
                />

                <Camera
                  size={35}
                  className="m-auto absolute top-[2px] left-6  mt-6 text-foreground"
                  onClick={() => {
                    if (logoImageRef.current) logoImageRef.current.click();
                  }}
                />
              </div>

              {isValidURL(cropedLogoImage) ? (
                <Image
                  className={`rounded-2xl aspect-[1/1]  h-auto object-cover absolute top-0 	group-hover:opacity-10 ease-in-out transition-all duration-300 `}
                  height={86}
                  width={86}
                  alt="images"
                  src={cropedLogoImage}
                />
              ) : cropedLogoImage !== null ? (
                <Image
                  className={`rounded-2xl aspect-[1/1]  h-auto object-cover absolute top-0 	group-hover:opacity-10 ease-in-out transition-all duration-300 `}
                  height={86}
                  width={86}
                  alt="images"
                  src={window.URL.createObjectURL(cropedLogoImage)}
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
                      cropShape={"round"}
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

        <label
          className={`font-sans  text-md  font-medium  transition-all duration-200 ease-in-out left-4 text-foreground`}
        >
          Upload Banner <span className="text-red-500">*</span>
        </label>

        <Modal>
          <ModalTrigger
            closeModal={closeModal}
            className="bg-background dark:text-black text-white flex justify-center group/modal-btn"
          >
            <div
              className=" w-[200px] relative bg-background
                        flex justify-center items-center h-[200px]  mt-4"
            >
              <input
                ref={heroImageRef}
                autoComplete="off"
                type="file"
                id="fullName"
                accept="image/png, image/jpeg,image/jpg"
                className="opacity-0 h-full w-full absolute z-40 cursor-pointer"
                onChange={(e: any) => {
                  setEditImgType(2);
                  setSelectedProfile(e.target.files[0]);
                  // setShowModel(true);
                }}
              />

              <Camera
                size={35}
                className="text-foreground z-20"
                onClick={() => {
                  if (heroImageRef.current) heroImageRef.current.click();
                }}
              />

              {isValidURL(cropedHeroImage) ? (
                <Image
                  className={`aspect-square w-full absolute top-0 rounded-md  h-full object-cover  ease-in-out transition-all duration-300
					group-hover:opacity-10
					`}
                  alt="images"
                  height={200}
                  width={200}
                  src={cropedHeroImage}
                />
              ) : cropedHeroImage !== null ? (
                <Image
                  className={`aspect-square w-full absolute top-0 rounded-md  h-full object-cover  ease-in-out transition-all duration-300
                        group-hover:opacity-10
                        `}
                  alt="images"
                  height={200}
                  width={200}
                  src={window.URL.createObjectURL(cropedHeroImage)}
                />
              ) : (
                <Image
                  className={`aspect-square  w-[200px] h-[200px] rounded-md  absolute    object-cover 
                   
                    `}
                  alt="images"
                  height={200}
                  width={200}
                  src={"/banner.webp"}
                />
              )}
            </div>
          </ModalTrigger>

          {selectedProfile && (
            <ModalBody>
              <ModalContent>
                <div className="px-6 py-4 min-h-[300px] h-auto w-full flex justify-center items-center overflow-hidden relative ">
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
          title:
            website?.title ||
            "Discover the Ultimate Salon Experience with " +
              businessUser?.businessName,
          subtitle:
            website?.subtitle ||
            "Step into a world of style and relaxation. Book your appointment today and let our expert team bring out the best in you.",
          whatsapp: website?.whatsapp || "",
          mobile: website?.mobile || "",
          facebook: website?.facebook || "",
          instagram: website?.instagram || "",
          youtube: website?.youtube || "",
          maps: website?.maps || "",
          address: website?.address || "",
          email: website?.email || "",
          slug: website?.slug || "",
          pincode: website?.pincode || "",
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.title) {
            errors.title = "Required";
          }

          if (!values.subtitle) {
            errors.subtitle = "Required";
          }

          if (!values.pincode) {
            errors.pincode = "Required";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.whatsapp) {
            errors.whatsapp = "Required";
          } else if (
            typeof values.whatsapp == "string"
              ? values.whatsapp.length != 10
              : JSON.stringify(values.whatsapp).length != 10
          ) {
            errors.whatsapp = "Invalid mobile number";
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

          if (values.facebook != "" && !isValidURL(values.facebook)) {
            errors.facebook = "facebook link is not valid";
          }
          if (values.instagram != "" && !isValidURL(values.instagram)) {
            errors.instagram = "Instagram link is not valid";
          }
          if (values.youtube != "" && !isValidURL(values.youtube)) {
            errors.youtube = "Youtube link is not valid";
          }

          if (values.maps != "" && !isValidURL(values.maps)) {
            errors.maps = "Google Map link is not valid";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          let data = new FormData();

          if (selectedCountry == null) {
            setAddressArr({
              ...addressArr,
              countryErr: "Please select country",
            });
            return;
          } else {
            setAddressArr({
              ...addressArr,
              countryErr: "",
            });
          }

          if (selectedState == null) {
            setAddressArr({
              ...addressArr,
              stateErr: "Please select state",
            });
            return;
          } else {
            setAddressArr({
              ...addressArr,
              stateErr: "",
            });
          }

          if (selectedCity == null) {
            setAddressArr({
              ...addressArr,
              cityErr: "Please select city",
            });
            return;
          } else {
            setAddressArr({
              ...addressArr,
              cityErr: "",
            });
          }

          data.append("title", values.title);
          data.append("subtitle", values.subtitle);
          data.append("whatsapp", values.whatsapp);
          data.append("mobile", values.mobile);
          data.append("facebook", values.facebook);
          data.append("instagram", values.instagram);
          data.append("youtube", values.youtube);
          data.append("maps", values.maps);
          data.append("email", values.email);
          data.append("address", values.address);
          data.append("slug", values.slug);

          if (!isValidURL(cropedLogoImage) && cropedLogoImage != null) {
            data.append("logo", cropedLogoImage, cropedLogoImage.name);
          } else if (cropedLogoImage == null) {
            toast("Logo is required, Please upload logo", {
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
            data.append("logo", cropedLogoImage);
          }

          if (!isValidURL(cropedHeroImage) && cropedHeroImage != null) {
            data.append("heroImage", cropedHeroImage, cropedHeroImage.name);
          } else if (cropedHeroImage == null) {
            toast("banner Image is required, please upload banner", {
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
            data.append("heroImage", cropedHeroImage);
          }

          data.append("weekdays", JSON.stringify(dayOfWeek));
          data.append("startTime", timeSelector?.startTime);
          data.append("endTime", timeSelector?.endTime);
          data.append(
            "breakTimeStart",
            moment(timeSelector?.breakTimeStart).format("hh:mm A")
          );
          data.append(
            "breakTimeEnd",
            moment(timeSelector?.breakTimeEnd).format("hh:mm A")
          );
          data.append("state", selectedState.value);
          data.append("city", selectedCity.value);
          data.append(
            "country",
            JSON.stringify({
              value: selectedCountry.value,
              currency: selectedCountry.currency,
              countryCode: selectedCountry.isoCode,
              phonecode: selectedCountry.phonecode,
            })
          );
          data.append("pincode", values.pincode);

          apicall({
            path: "website",
            getResponse: (res) => {
              toast("Your website updated successfully", {
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
            getError: (err) => {},
            router,
            method: "post",
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
                name="title"
                label="Website title"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={errors.title}
                touched={touched.title}
                required
                // isDisabled={true}
              />
            </div>
            <div className="my-4">
              <CustomInput
                type="text"
                name="subtitle"
                label="Website Subtitle"
                id="businessName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subtitle}
                error={errors.subtitle}
                touched={touched.subtitle}
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
                type="number"
                name="whatsapp"
                label="Whatsapp"
                id="whatsapp"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.whatsapp}
                error={errors.whatsapp}
                touched={touched.whatsapp}
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
                inputLabel="Address (don't include Business Name,contry,state,city)"
                inputId="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                inputError={errors.address}
                inputTouched={touched.address}
                required
              />
            </div>

            <div className="mt-4 w-full flex justify-between ">
              <div className="w-[48%] ">
                <MultiSelectComp
                  full={true}
                  title="Select Country"
                  refSelect={country}
                  required={true}
                  menuPlacement="top"
                  onChange={(e: any) => {
                    setSelectedCountry(e);
                  }}
                  isMulti={false}
                  placeholder="Select Country"
                  error={addressArr.countryErr}
                  options={country}
                  defaultValue={selectedCountry}

                  // error={submitCount > 0 && membersArrErr}
                />
              </div>

              {states && (
                <div className="w-[48%] ">
                  <MultiSelectComp
                    full={true}
                    title="Select State"
                    refSelect={states}
                    required={true}
                    menuPlacement="top"
                    onChange={(e: any) => {
                      setSelectedState(e);
                    }}
                    isMulti={false}
                    placeholder="Select State"
                    error={addressArr.stateErr}
                    options={states}
                    defaultValue={selectedState}

                    // error={submitCount > 0 && membersArrErr}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 w-full flex justify-between ">
              {cities && (
                <div className="w-[48%] ">
                  <MultiSelectComp
                    full={true}
                    title="Select City"
                    refSelect={cities}
                    required={true}
                    menuPlacement="top"
                    onChange={(e: any) => {
                      setSelectedCity(e);
                    }}
                    isMulti={false}
                    placeholder="Select City"
                    error={addressArr.cityErr}
                    options={cities}
                    defaultValue={selectedCity}

                    // error={submitCount > 0 && membersArrErr}
                  />
                </div>
              )}
              <div className="w-[48%] ">
                <CustomInput
                  name="pincode"
                  label="Pincode"
                  id="pincode"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pincode}
                  error={errors.pincode}
                  touched={touched.pincode}
                  required
                />
              </div>
            </div>

            <div className="w-full max-w-[450px] mt-4  mb-[10px]">
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

              {/* <div className="my-[20px] w-full flex justify-between md:justify-start">
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
              </div> */}

              <div>
                <p className="text-sm mt-[5px] text-red-500">{dayOfWeekErr}</p>
              </div>
            </div>

            <div className="my-4">
              <CustomInput
                type="text"
                name="instagram"
                label="Instagram"
                placeholder="link (URL) here"
                id="insta"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.instagram}
                error={errors.instagram}
                touched={touched.instagram}
                // isDisabled={true}
              />
            </div>

            <div className="my-4">
              <CustomInput
                type="text"
                name="facebook"
                label="Facebook"
                placeholder="link (URL) here"
                id="insta"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.facebook}
                error={errors.facebook}
                touched={touched.facebook}
                // isDisabled={true}
              />
            </div>

            <div className="my-4">
              <CustomInput
                type="text"
                name="maps"
                label="Google Maps"
                placeholder="link (URL) here"
                id="insta"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maps}
                error={errors.maps}
                touched={touched.maps}
                // isDisabled={true}
              />
            </div>
            <div className="my-4">
              <CustomInput
                type="text"
                name="youtube"
                label="Youtube"
                placeholder="link (URL) here"
                id="insta"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.youtube}
                error={errors.youtube}
                touched={touched.youtube}
                // isDisabled={true}
              />
            </div>

            <div className="mb-6">
              <Button type="submit" title="Submit" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Website;
