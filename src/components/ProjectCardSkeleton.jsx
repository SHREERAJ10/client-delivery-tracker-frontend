import React from 'react'
import { Skeleton } from './ui/skeleton.jsx'

function ProjectCardSkeleton() {
    return (
        <>
            <div className="mx-auto flex w-full flex-col gap-6 border border-b-2 border-r-4 border-[#111111] bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="h-6 w-40 rounded-sm" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                    </div>

                    <div className="mt-2">
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                </div>
            </div>
        </>
    )
}

export default ProjectCardSkeleton