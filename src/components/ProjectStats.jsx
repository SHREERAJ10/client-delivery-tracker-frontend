import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { BriefcaseBusiness, CircleAlert, ClipboardList } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const icons = {
  totalActiveProjects: <BriefcaseBusiness />,
  overdueDeliverables: <CircleAlert />,
  pendingDeliverables: <ClipboardList />,
};

function ProjectStats() {
  const [stats, setStats] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const projectStats = await getData(user, "/client/projects/stats");
      setStats(projectStats);
    })();
  }, []);
  return (
    <section className="flex flex-col lg:flex-row gap-y-6 justify-between">
      {stats.map((stat) => {
        return (
          <div
            key={stat.key}
            className="flex items-center gap-4 pr-8 py-3 bg-white shadow-sm border border-b-2 border-r-4 border-[#111]"
          >
            <div className="flex items-center justify-center w-12 h-12 text-[#111] shrink-0">
              {icons[stat.key]}
            </div>

            <div className="flex flex-col leading-tight">
              <h3 className="text-xs font-medium text-gray-800 uppercase tracking-wide">
                {stat.label}
              </h3>

              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-gray-900">
                  {stat.value} {stat.status}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ProjectStats;
