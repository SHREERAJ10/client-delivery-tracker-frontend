import React from 'react'

function DeliverableOverviewCell({ label, value }) {
    return (
        <div className="flex justify-between items-center sm:block">
            <span className="text-xs uppercase tracking-wide text-gray-400 sm:hidden">
                {label}
            </span>
            <span className="text-sm text-gray-800 font-medium sm:font-normal">
                {value}
            </span>
        </div>
    )
}

export default DeliverableOverviewCell