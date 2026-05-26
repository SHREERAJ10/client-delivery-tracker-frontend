import React from "react";

function StatCell({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-0.5 md:block ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 md:hidden">
        {label}
      </span>
      <span className="text-lg font-medium text-black md:font-normal md:text-base md:text-center md:w-full md:inline-block">
        {children}
      </span>
    </div>
  );
}

export default StatCell;
