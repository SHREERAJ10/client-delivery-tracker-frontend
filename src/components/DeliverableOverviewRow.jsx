import React from "react";
import DeliverableOverviewCell from "./DeliverableOverviewCell.jsx";
import Badge from "./Badge.jsx";

function DeliverableOverviewRow({ item, formatDate }) {
  return (
    <div>
      <div
        className="
        border border-gray-200 bg-white p-5 mb-4 flex flex-col gap-3 rounded-none shadow-sm
        
        sm:grid sm:grid-cols-[1.5fr_1.5fr_1.5fr_1fr_1fr] sm:gap-y-0 sm:items-center
        sm:border-t sm:border-x-0 sm:border-b-0 sm:p-0 sm:px-4 sm:py-3 sm:mb-0 sm:shadow-none
        hover:bg-gray-50 transition-colors
      "
      >
        <DeliverableOverviewCell label="Client">
          <span className="font-bold">
            {item.clientName}
          </span>
        </DeliverableOverviewCell>
        <DeliverableOverviewCell label="Project">
          <spanc className="font-normal text-gray-800">
            {item.projectName}
          </spanc>
        </DeliverableOverviewCell>
        <DeliverableOverviewCell label="Deliverable Name">
          {item.name}
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
