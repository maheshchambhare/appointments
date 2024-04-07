import React, { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalLayoutProps {
  isOpen: boolean;
  modalTitle?: string;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  modalWidth?: string;
  tab?: string;
  dontCloseWhenClickedOut?: boolean;
  minHeight?: string;
  hideX?: boolean;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isOpen,
  modalTitle,
  setIsOpen,
  children,
  modalWidth,
  tab,
  dontCloseWhenClickedOut,
  minHeight,
  hideX,
}) => {
  const [isMainDiv, setIsMainDiv] = useState(false);
  const [childDiv, setChildDiv] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.innerWidth < 1000) {
        setIsMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMainDiv(isOpen);
      setTimeout(() => {
        setChildDiv(true);
      }, 500);
    } else {
      setIsMainDiv(isOpen);
      setTimeout(() => {
        setChildDiv(isOpen);
      }, 500);
    }
  }, [isOpen]);

  return (
    <>
      <div
        onClick={(e) => {
          if (!dontCloseWhenClickedOut) {
            setChildDiv(false);
            setTimeout(() => {
              setIsOpen(false);
              setIsMainDiv(false);
            }, 500);
          }
        }}
        className={`fixed h-[100vh]  left-0 top-0  bottom-0 right-0 z-[1800] w-full ${
          isMainDiv ? "flex" : " hidden"
        }  h-full  justify-center  items-center bg-opacity-[0.6] overflow-hidden bg-black
        xsm:items-end sm:items-end md:items-end
        `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            width: isMobile ? "100%" : modalWidth ? `${modalWidth}` : "30%",
            height: minHeight && "max-content",
            minHeight: minHeight && "max-content",
          }}
          className={`relative z-[100]  min-h-max  max-h-[80vh]     pb-6  px-5 ${
            childDiv
              ? "scale-[1]  xsm:translate-y-0 sm:translate-y-0 md:translate-y-0 xsm:scale-100 sm:scale-100 md:scale-100 duration-300"
              : "scale-0 xsm:translate-y-[1500px] sm:translate-y-[1500px] md:translate-y-[1500px] xsm:scale-100 sm:scale-100 md:scale-100 xsm:duration-1000 sm:duration-1000 md:duration-1000 duration-300"
          } ${
            tab ? "min-h-[80vh]" : ""
          } transform transition-all  ease-out  bg-background rounded-lg shadow
          xsm:max-h-[85vh] sm:max-h-[85vh] md:max-h-[85vh]
          xsm:h-auto sm:h-auto md:h-auto
          xsm:rounded-t-lg sm:rounded-t-lg md:rounded-t-lg
          xsm:rounded-b-none sm:rounded-b-none md:roundedt-b-none
          xsm:w-full sm:w-full md:w-full overflow-scroll
        `}
        >
          <div
            className={`cursor-pointer   ${
              modalTitle ? "mb-5 py-3" : "mb-0 pt-3"
            }   px-1 items-center  ${
              modalTitle ? "border-b-[1px] border-gray-20" : ""
            }  flex justify-center`}
          >
            {modalTitle && (
              <h3 className="mx-auto flex justify-center items-center w-full font-heading  text-[22px]  font-medium">
                {isMobile ? (
                  <>
                    {modalTitle.substring(0, 20)}
                    {modalTitle.length > 20 && "..."}
                  </>
                ) : (
                  modalTitle
                )}
              </h3>
            )}
            {!hideX && (
              <X
                onClick={(e) => {
                  e.stopPropagation();
                  setChildDiv(false);
                  setTimeout(() => {
                    setIsOpen(false);
                    setIsMainDiv(false);
                  }, 500);
                }}
                className="text-[20px] ml-auto"
              />
            )}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
