import DeliverableTable from "@/components/DeliverableTable.jsx";
import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DeliverablePage() {

  const { projectId } = useParams();
  const [currProject, setCurrProject] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const project = await getData(user, `/project/${projectId}`);
      setCurrProject(project);
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-y-4 py-4">
        <section className="flex justify-between gap-4 px-7">
          <SearchBar placeholder="Search deliverables by name or status" />
          <Filter />
        </section>
        <section className="flex justify-between px-7">
          {currProject && <DeliverableTable currProject={currProject} />}

        </section>
      </div>
    </div>
  );
}

export default DeliverablePage;
