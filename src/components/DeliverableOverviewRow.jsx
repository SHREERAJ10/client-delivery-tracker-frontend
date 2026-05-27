import React from "react";
import DeliverableOverviewCell from "./DeliverableOverviewCell.jsx";
import Badge from "./Badge.jsx";

function DeliverableOverviewRow({ item, formatDate }) {
  return (
    <div>
      <div
        className="
        border border-b-2 border-r-4 border-[#111] md:border md:border-gray-200 bg-white p-5 mb-4 flex flex-col gap-3 rounded-none shadow-sm
        
        md:grid md:grid-cols-[1.5fr_1.5fr_1.5fr_1fr_1fr] md:gap-y-0 md:items-center
        md:border-t md:border-x-0 md:border-b-0 md:p-0 md:px-4 md:py-3 md:mb-0 md:shadow-none
        hover:bg-gray-50 transition-colors
      "
      >
        <DeliverableOverviewCell label="Client">
          <span className="font-bold">
            {item.clientName}
          </span>
        </DeliverableOverviewCell>
        <DeliverableOverviewCell label="Project">
          <span className="font-normal text-gray-800">
            {item.projectName}
          </span>
        </DeliverableOverviewCell>
        <DeliverableOverviewCell label="Deliverable Name">
          <span className="font-medium">
            {item.name}
          </span>
        </DeliverableOverviewCell>
        <DeliverableOverviewCell label="Due Date">
          <span className="font-bold">
            {formatDate(item.due_Date)}
          </span>
        </DeliverableOverviewCell>
        <DeliverableOverviewCell label="Status">
          <Badge>
            {item.status}
          </Badge>
        </DeliverableOverviewCell>
      </div>
    </div>
  );
}

export default DeliverableOverviewRow;
