import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { EllipsisVertical, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";
import ProjectCard from "@/components/ProjectCard.jsx";

function ProjectPage() {
  const { clientId } = useParams();
  const { user } = useContext(AuthContext);
  const [clientData, setClientData] = useState(null);
  const [projectData, setProjectData] = useState(null);

  console.log(projectData);

  useEffect(() => {
    (async () => {
      const client = await getData(user, `/client/${clientId}`);
      const projectDetails = await getData(
        user,
        `/client/${clientId}/project/details`,
      );
      setClientData(client);
      setProjectData(projectDetails);
    })();
  }, []);

  return (
    <div>
      <div className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:pr-8 md:pl-4">
        <h2 className="font-primary text-xl font-semibold">
          {clientData && clientData.name}
        </h2>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          <Plus size={18} />
          Add Project
        </button>
      </div>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 py-4">
          <section className="flex justify-between gap-4 px-7">
            <SearchBar placeholder="Search projects by name or status..." />
            <Filter />
          </section>
        </div>
        <section className="px-6 flex flex-col gap-y-8">
          {console.log(projectData)}
          {projectData != null && projectData.items.length != 0
            ? projectData.items.map((project) => {
                return <ProjectCard key={project.id} {...project} />;
              })
            : null}
        </section>
      </div>
    </div>
  );
}

export default ProjectPage;
