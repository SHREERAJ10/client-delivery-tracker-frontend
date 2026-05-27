import React from 'react'

function Stats({ item, icons }) {
    return (
        <>
            <div
                className="flex items-center gap-1.5 pr-8 py-3 bg-white shadow-sm border border-b-2 border-r-4 border-[#111]"
            >
                <div className="flex items-center justify-center w-12 h-12 text-[#111] shrink-0">
                    {icons[item.key]}
                </div>

                <div className="flex flex-col leading-tight">
                    <h3 className="text-xs font-medium text-gray-800 uppercase tracking-wide">
                        {item.label}
                    </h3>
                    {console.log(item.status)}
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-gray-900">
                            {item.value} {item.status ?? ""}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stats