import React from "react";

function Backdrop({ setIsOpen }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center"
      onClick={() => setIsOpen(false)}
    >
    </div>
  );
}

export default Backdrop;
