import React from "react";

function Button({
  title,
  onClick,
  type = "button",
}: {
  title?: String;
  onClick?: any;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type={type}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="inline-flex w-full md:w-auto h-12 text-foreground animate-shimmer text-base items-center justify-center rounded-lg border border-slate-800 bg-[linear-gradient(110deg,#fff,45%,#eee,55%,#fff)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      {title}
    </button>
  );
}

export default Button;
