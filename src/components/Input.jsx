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
        className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-xl shadow-sm outline-none transition
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                   placeholder:text-gray-400"
      />
    </div>
  );
}

export default Input;
