import React from 'react'

function Badge({ children }) {
    return (
        <span className="bg-gray-100 inline-block dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-none">
            {children}
        </span>
    )
}

export default Badge