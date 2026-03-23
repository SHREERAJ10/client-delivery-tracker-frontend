import React from "react";

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function DeliverableOverviewTable({ deliverables, type }) {
  return (
    <div className="w-full font-secondary">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4">Client</th>
              <th className="p-4">Project</th>
              <th className="p-4">Deliverable Name</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {deliverables.length !=0?deliverables.map((item, index) => (
              <tr key={index} className="border-t text-sm hover:bg-gray-50">
                <td className="p-4">{item.clientName}</td>
                <td className="p-4">{item.projectName}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{formatDate(item.due_Date)}</td>
                <td className="p-4">{item.status}</td>
              </tr>
            )):<tr className="border-t text-base hover:bg-gray-50 font-secondary italic text-[#3A3A3A] text-center"><td colspan="5" className="py-4">No {type} Deliverables</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden flex flex-col gap-4">
        {deliverables.length!=0?deliverables.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 bg-white"
          >
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Client</span>
              <span className="font-medium">{item.clientName}</span>
            </div>

            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Project</span>
              <span className="font-medium">{item.projectName}</span>
            </div>

            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Deliverable</span>
              <span className="font-medium">{item.name}</span>
            </div>

            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Due Date</span>
              <span className="font-medium">{formatDate(item.due_Date)}</span>
            </div>

            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Status</span>
              <span className="font-medium">{item.status}</span>
            </div>
          </div>
        )):<div>No {type} deliverables</div>}
      </div>
    </div>
  );
}

export default DeliverableOverviewTable;
