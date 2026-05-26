import React from 'react'

function DeliverableOverviewCell({ label, children }) {
    return (
        <div className="flex flex-col items-start gap-1 w-full min-w-0 md:block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block md:hidden">
                {label}
            </span>

            <span className="text-base text-black font-medium md:font-normal inline-block w-full min-w-0 [word-break:break-word] whitespace-normal md:pr-4">
                {children}
            </span>
        </div>
    )
}

export default DeliverableOverviewCell