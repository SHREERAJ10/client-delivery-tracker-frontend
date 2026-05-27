import { Skeleton } from "@/components/ui/skeleton"

export default function TableSkeleton({
  rows = 5,
  size = "md:grid-cols-[2fr_1fr_1fr_1fr_40px]",
}) {
  return (
    <div className="flex flex-col gap-4 md:block">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`
            grid bg-white px-4 py-3
            border border-b-2 border-r-4 border-[#111]

            grid-cols-2 gap-y-3
            md:rounded-none md:border-0 md:border-t md:border-gray-200
            md:items-center md:gap-y-0

            ${size}
          `}
        >
          {/* Client name */}
          <Skeleton className="h-5 w-32" />

          {/* Fake kebab/menu */}
          <div className="justify-self-end md:hidden">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>

          {/* Stats section */}
          <div className="col-span-2 grid grid-cols-3 gap-2 md:contents">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 md:items-center"
              >
                {/* Mobile label */}
                <Skeleton className="h-3 w-14 md:hidden" />

                {/* Value */}
                <Skeleton className="h-5 w-10 md:w-12" />
              </div>
            ))}
          </div>

          {/* Desktop menu column */}
          <div className="hidden md:flex md:justify-end">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}