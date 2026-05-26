import React from 'react'

function DeliverableOverviewCell({ label, children }) {
    return (
        <div className="flex flex-col items-start gap-1 w-full min-w-0 sm:block">
            {/* Mobile-only Label: Structured archive aesthetic */}
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block sm:hidden">
                {label}
            </span>

            {/* Content wrapper: Handles wrapping perfectly inside cards */}
            <span className="text-base text-black font-medium sm:font-normal inline-block w-full min-w-0 [word-break:break-word] whitespace-normal sm:pr-4">
                {children}
            </span>
        </div>
    )
}

export default DeliverableOverviewCell