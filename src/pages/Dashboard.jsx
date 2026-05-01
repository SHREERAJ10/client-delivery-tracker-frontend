import Backdrop from "@/components/Backdrop.jsx";
import DashboardNavbar from "@/components/DashboardNavbar.jsx";
import DeliverableForm from "@/components/DeliverableForm.jsx";
import DeliverableOverview from "@/components/DeliverableOverview.jsx";
import MetricsGrid from "@/components/MetricsGrid.jsx";
import { useState } from "react";

const DELIVERABLE_OVERVIEW_DATA = [
  {
    type: "Overdue",
    heading: "Overdue Deliverables",
    route: "/dashboard/deliverables?type=overdue&pageSize=3",
  },
  {
    type: "Upcoming",
    heading: "Upcoming Deliverables (Next 7 Days)",
    route: "/dashboard/deliverables?type=upcoming&pageSize=3",
  },
];

function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-full h-full bg-[#f2f2f2]">
      <DashboardNavbar setIsFormOpen={setIsFormOpen} />
      <section className="flex flex-col px-5 py-6 gap-y-8">
        <MetricsGrid />
        {DELIVERABLE_OVERVIEW_DATA.map((deliverable, index) => {
          return (
            <DeliverableOverview
              key={index}
              heading={deliverable.heading}
              deliverableRoute={deliverable.route}
              type={deliverable.type}
            />
          );
        })}
      </section>
      {isFormOpen && (
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsFormOpen} />
          <DeliverableForm
            mode="CREATE"
            prefillData={{
              deliverableName: "Abc",
              projectId: "67",
              statusId: "123",
              due_Date: "2026-05-12",
              note: "",
            }}
            setIsFormOpen={setIsFormOpen}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
