import React from 'react'

function Button({ className, onClick = () => { }, type = "button", variant = "", children }) {
    return (
        <button type={type} className={`flex items-center justify-between gap-2 p-4 py-2 text-sm font-medium transition whitespace-nowrap ${variant == "outline" ? "bg-white border border-black text-[#111]" : "bg-[#111] text-white hover:brightness-110"} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button