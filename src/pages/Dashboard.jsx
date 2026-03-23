import DashboardNavbar from "@/components/DashboardNavbar.jsx";
import DeliverableOverview from "@/components/DeliverableOverview.jsx";
import MetricsGrid from "@/components/MetricsGrid.jsx";

const DELIVERABLE_OVERVIEW_DATA = [
  {
    type:"Overdue",
    heading: "Overdue Deliverables",
    route: "/dashboard/deliverables?type=overdue&pageSize=3",
  },
  {
    type:"Upcoming",
    heading: "Upcoming Deliverables (Next 7 Days)",
    route: "/dashboard/deliverables?type=upcoming&pageSize=3",
  },
];

function Dashboard() {
  return (
    <div className="w-full h-full bg-[#f2f2f2]">
      <DashboardNavbar />
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
    </div>
  );
}

export default Dashboard;
