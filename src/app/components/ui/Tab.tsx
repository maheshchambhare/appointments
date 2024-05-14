import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function Tab({
  tabs,
  selectedTab,
  activateTab,
}: {
  tabs: string[];
  selectedTab: (val: any) => void;
  activateTab: number;
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef: any = useRef([]);

  useEffect(() => {
    setActiveTabIndex(activateTab);
  }, [activateTab]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab: any = tabsRef.current[activeTabIndex];

      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className="relative overflow-hidden max-w-[97%] xsm:mx-auto md:mx-0">
      {/* <span
        className="absolute hidden md:block z-[-1] bottom-0  h-1 ml-[-10px]   rounded-md bg-gradient-br  backdrop-blur-2xl  transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth + 20 }}
      /> */}
      <div className="flex overflow-scroll scrollbar-hide space-x-3 z-1 font-sans gap-x-6 font-semibold xsm:text-[13px] sm:text-[13px] md:text-sm xsm:space-x-2 sm:space-x-2 md:space-x-2">
        {tabs.map((tab, idx) => {
          return (
            <button
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              className={`pb-3 w-max  pt-2 text-nowrap  text-base ease-out cursor-pointer ${
                activateTab == idx
                  ? " text-transparent bg-clip-text bg-gradient-br text-clip"
                  : "text-textPrimary"
              }`}
              onClick={() => {
                setActiveTabIndex(idx);
                selectedTab(idx);
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tab;
