import React from "react";
import DeliverableRow from "./DeliverableRow.jsx";

function DeliverableTable({ deliverables, setDeliverables, setOptimisticDeliverables, triggerRefetch }) {

  if (!deliverables) return null;

  return (
    <section className="w-full">
      <div className="w-full border-0 md:border md:border-gray-200 overflow-hidden font-secondary">
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_40px] bg-gray-50 px-4 py-3 text-sm text-gray-500 uppercase font-semibold">
          <span>Deliverable Name</span>
          <span className="text-center">Due Date</span>
          <span className="text-center">Status</span>
          <span className="text-center">Notes</span>
          <span />
        </div>

        <div className="flex flex-col gap-4 md:block">
          {deliverables?.items?.length ? (
            deliverables.items.map((deliverable) => (
              <DeliverableRow
                key={deliverable.id}
                id={deliverable.id}
                deliverable={deliverable}
                setOptimisticDeliverables={setOptimisticDeliverables}
                setDeliverables={setDeliverables}
                triggerRefetch={triggerRefetch}
              />
            ))
          ) : (
            <p className="py-6 text-center text-sm italic text-gray-400">
              No Deliverables Found. Add Deliverables to get Started.
            </p>
          )}
        </div>
      </div>

    </section>
  );
}

export default DeliverableTable;
