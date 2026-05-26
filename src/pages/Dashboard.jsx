import Backdrop from "@/components/Backdrop.jsx";
import DashboardNavbar from "@/components/DashboardNavbar.jsx";
import DeliverableForm from "@/components/DeliverableForm.jsx";
import DeliverableOverview from "@/components/DeliverableOverview.jsx";
import MetricsGrid from "@/components/MetricsGrid.jsx";
import { useState } from "react";

const DELIVERABLE_OVERVIEW_DATA = [
  {
    type: "overdue",
    heading: "Overdue Deliverables",
    route: "/dashboard/deliverables?type=overdue&pageSize=3",
  },
  {
    type: "upcoming",
    heading: "Upcoming Deliverables (Next 7 Days)",
    route: "/dashboard/deliverables?type=upcoming&pageSize=3",
  },
];

function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <DashboardNavbar setIsFormOpen={setIsFormOpen} />
      <section className="flex flex-col px-10 py-6 gap-y-8">
        <MetricsGrid />
        <div className="flex flex-col gap-y-14 items-start">
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

        </div>
      </section>
      {isFormOpen && (
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsFormOpen} />
          <DeliverableForm
            mode="CREATE"
            setIsFormOpen={setIsFormOpen}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
