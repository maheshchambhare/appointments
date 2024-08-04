"use client";
import Otp from "@/app/components/forms/Otp";
import SignUp from "@/app/components/forms/SignUp";
import { Step, type StepItem, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = [
  { label: "Basic Deails" },
  { label: "Select Plan" },
  { label: "Done" },
] satisfies StepItem[];

export default function StepperDemo() {
  const formRef: any = useRef(null);
  const otpRef: any = useRef(null);
  const [otpData, setOtpData] = useState("");
  const [apiRes, setApiRes] = useState({
    loader: false,
    success: false,
  });
  const router = useRouter();
  const handleBasicSubmit = () => {
    try {
      formRef.current.handleSubmit();
      return true;
    } catch (e) {}
  };

  const otpSubmit = () => {
    setApiRes({
      loader: true,
      success: false,
    });

    apicall({
      path: "verifyotp",
      getResponse: (res) => {
        setApiRes({
          loader: false,
          success: true,
        });

        // toast(
        //   "🥳 Sign up successful, you can login after admin verifies your account",
        //   {
        //     position: "bottom-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     transition: Bounce,
        //   }
      },
      getError: (err) => {
        setApiRes({
          loader: false,
          success: false,
        });
        toast(err.response.data.message, {
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
      data: { otp: otpData },
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              {index == 0 ? (
                <div className="px-2 md:mt-6 md:p-4  ">
                  <SignUp
                    formRef={formRef}
                    setRes={(e: any) => {
                      setApiRes(e);
                    }}
                    setotpform={(e) => {
                      // setOtpForm(e);
                    }}
                  />
                </div>
              ) : (
                <div className="px-2 md:mt-6 md:p-4  ">
                  <Otp otp={otpData} getOtp={(e: any) => setOtpData(e)} />
                </div>
              )}
            </Step>
          );
        })}
        <Footer
          handleBasicSubmit={handleBasicSubmit}
          otpSubmit={otpSubmit}
          apiRes={apiRes}
        />
      </Stepper>
    </div>
  );
}

const Footer = ({
  handleBasicSubmit,
  otpSubmit,
  apiRes,
}: {
  handleBasicSubmit: any;
  otpSubmit: any;
  apiRes: any;
}) => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
    currentStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (!apiRes.loader) {
                  if (currentStep.label == "Basic Deails") {
                    handleBasicSubmit();
                  } else if (currentStep.label == "OTP") {
                    otpSubmit();
                  } else if (currentStep.label == "Select Plan") {
                    console.log("plan");
                  } else {
                    console.log("last options");
                  }
                  if (apiRes.success) {
                    nextStep();
                  }
                }
              }}
            >
              {apiRes.loader ? (
                <div className="flex flex-row gap-2">
                  <div className="w-2 h-2 rounded-full bg-background animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-background animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-background animate-bounce [animation-delay:-.5s]"></div>
                </div>
              ) : isLastStep ? (
                "Finish"
              ) : isOptionalStep ? (
                "Skip"
              ) : (
                "Next"
              )}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
