import React, { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalLayoutProps {
  isOpen: boolean;

  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

const Menu: React.FC<ModalLayoutProps> = ({ isOpen, setIsOpen, children }) => {
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
          setChildDiv(false);
          setTimeout(() => {
            setIsOpen(false);
            setIsMainDiv(false);
          }, 500);
        }}
        className={`fixed h-[100vh]  left-0 top-0  bottom-0 right-0 z-[1800] w-full ${
          isMainDiv ? "flex" : " hidden"
        }   bg-opacity-[0.6] overflow-hidden bg-black
        xsm:items-end sm:items-end md:items-end
        `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            width: "50%",
            maxWidth: 300,
          }}
          className={`relative z-[100]  h-[100vh]    pb-6  px-5 ${
            childDiv
              ? "scale-[1]  xsm:translate-x-0 sm:translate-x-0 md:translate-x-0 xsm:scale-100 sm:scale-100 md:scale-100 duration-300"
              : "scale-0 xsm:translate-x-[1500px] sm:translate-x-[1500px] md:translate-x-[1500px] xsm:scale-100 sm:scale-100 md:scale-100 xsm:duration-1000 sm:duration-1000 md:duration-1000 duration-1000"
          }  transform transition-all  ease-out  bg-background rounded-lg shadow
        ml-auto
          xsm:rounded-t-lg sm:rounded-t-lg md:rounded-t-lg
          xsm:rounded-b-none sm:rounded-b-none md:roundedt-b-none
          xsm:w-full sm:w-full md:w-full overflow-scroll
        `}
        >
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

export default Menu;
