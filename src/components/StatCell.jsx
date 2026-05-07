import React from "react";

function StatCell({label, highlight, value, children}) {
  return (
    <div className="flex flex-col gap-0.5 sm:items-center">
      
      <span className="text-[11px] uppercase tracking-wide text-gray-400 sm:hidden">
        {label}
      </span>
      <span
        className={`text-sm font-medium sm:text-center ${
          highlight ? "text-red-600" : "text-gray-700"
        }`}
      >
        {children}
        {value}
      </span>
    </div>
  );
}

export default StatCell;
