import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

function AnimatedTabs({ tabs, activeTab, setActTab }: any) {
  return (
    <div className="flex space-x-1 ">
      {tabs.map((tab: any) => (
        <button
          key={tab.id}
          onClick={() => setActTab(tab.id)}
          className={`${
            activeTab === tab.id ? "" : "hover:text-foreground/60"
          } relative rounded-full px-3 py-1.5 font-mont text-sm md:text-base  font-medium text-foreground outline-sky-400 transition focus-visible:outline-2 min-w-max`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-foreground mix-blend-difference"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default AnimatedTabs;
