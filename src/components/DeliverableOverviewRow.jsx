import React from "react";
import DeliverableOverviewCell from "./DeliverableOverviewCell.jsx";

function DeliverableOverviewRow({ item, formatDate }) {
  return (
    <div>
      <div
        className="
        grid border-t border-gray-200 bg-white px-4 py-3
        hover:bg-gray-50 transition-colors

        grid-cols-1 gap-y-2
        sm:grid-cols-[1.5fr_1.5fr_2fr_1fr_1fr] sm:gap-y-0 sm:items-center
      "
      >
        <DeliverableOverviewCell label="Client" value={item.clientName} />
        <DeliverableOverviewCell label="Project" value={item.projectName} />
        <DeliverableOverviewCell label="Deliverable Name" value={item.name} />
        <DeliverableOverviewCell
          label="Due Date"
          value={formatDate(item.due_Date)}
        />
        <DeliverableOverviewCell label="Status" value={item.status} />
      </div>
    </div>
  );
}

export default DeliverableOverviewRow;
