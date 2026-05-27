import React from "react";
import DeliverableOverviewRow from "./DeliverableOverviewRow.jsx";
import TableSkeleton from "./TableSkeleton.jsx";

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function DeliverableOverviewTable({ isLoading, skeletonRows=5, deliverables, type }) {
  return (
    <div className="w-full md:border md:border-gray-200 overflow-hidden">

      <div className="hidden md:grid md:grid-cols-[1.5fr_1.5fr_1.5fr_1fr_1fr] bg-gray-50 px-4 py-3 text-sm text-gray-500 uppercase font-semibold">
        <span>Client</span>
        <span>Project</span>
        <span>Deliverable Name</span>
        <span>Due Date</span>
        <span>Status</span>
      </div>
      {isLoading ?
        <TableSkeleton size="grid-cols-[1.5fr_1.5fr_1.5fr_1fr_1fr]" skeletonAlign="items-start" rows={skeletonRows} />
        :
        <>{deliverables?.length !== 0 ? (
          deliverables?.map((item, index) => (
            <DeliverableOverviewRow key={index} item={item} formatDate={formatDate} />
          ))
        ) : (
          <p className="py-6 text-center text-sm italic text-gray-400">
            No {type} Deliverables
          </p>
        )}</>}


    </div>
  );
}

export default DeliverableOverviewTable;
