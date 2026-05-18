import React, { useEffect } from "react";

const ConfirmDialog = ({ setIsOpen, dialogText, action }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="w-full z-10 max-w-sm rounded-lg bg-white p-6 shadow-xl">
      <p className="mb-6 text-gray-700 text-lg text-center">{dialogText}</p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await action(()=>setIsOpen(false));
          }}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
