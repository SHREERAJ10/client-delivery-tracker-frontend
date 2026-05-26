import React from "react";

function Input({
  type = "text",
  label,
  name,
  register,
  required,
  placeholder = "",
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 outline-none transition placeholder:text-gray-400  focus-within:ring-1 focus-within:ring-black-500"
      />
    </div>
  );
}

export default Input;
