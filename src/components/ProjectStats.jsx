import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { BriefcaseBusiness, CircleAlert, ClipboardList } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Stats from "./Stats.jsx";

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
          <Stats item={stat} key={stat.key} icons={icons} />
        );
      })}
    </section>
  );
}

export default ProjectStats;
