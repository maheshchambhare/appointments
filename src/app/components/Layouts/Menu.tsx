import React, { ReactNode, useEffect, useState } from "react";
import { X, XSquareIcon } from "lucide-react";

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
    <div
      onClick={(e) => {
        setChildDiv(false);
        setTimeout(() => {
          setIsOpen(false);
          setIsMainDiv(false);
        }, 500);
      }}
      className={`fixed h-[100vh] cursor-pointer left-0 top-0  bottom-0 right-0 z-[1800] w-full ${
        isMainDiv ? "flex" : "hidden"
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
          minWidth: 250,
        }}
        className={`relative z-[100] scrollbar-hide h-full pb-6  px-5 ${
          childDiv
            ? "translate-x-0  duration-500"
            : "translate-x-[400px]  duration-1000"
        }  transform transition-all  ease-out  bg-background  shadow
        ml-auto
      
        `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            onClick={(e) => {
              setChildDiv(false);
              setTimeout(() => {
                setIsOpen(false);
                setIsMainDiv(false);
              }, 500);
            }}
            className="flex items-center absolute right-[20px] top-[30px]"
          >
            <XSquareIcon size={25} className="text-foreground" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Menu;
