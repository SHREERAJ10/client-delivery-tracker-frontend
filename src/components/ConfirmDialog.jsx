import React, { useEffect } from "react";
import Button from "./Button.jsx";

const ConfirmDialog = ({ setIsOpen, dialogText, action }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="w-full z-10 max-w-sm rounded-lg bg-white p-6 shadow-xl">
      <p className="mb-6 text-[#111] text-lg text-center">{dialogText}</p>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={async (e) => {
            e.stopPropagation();
            await action(() => setIsOpen(false));
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
