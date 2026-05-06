import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard.jsx";
import ProjectForm from "@/components/ProjectForm.jsx";
import Backdrop from "@/components/Backdrop.jsx";

function ProjectPage() {
  const { clientId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const [clientData, setClientData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const isReady = projectData && clientData;

  const currPage = Number(searchParams.get("page") || 1);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    (async () => {
      const client = await getData(user, `/client/${clientId}`);
      setClientData(client);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const projectDetails = await getData(
        user,
        `/client/${clientId}/project/details/?page=${currPage}`,
      );
      setProjectData(projectDetails);
    })();
  }, [searchParams]);

  return (
    <div>
      <div className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:pr-8 md:pl-4">
        <h2 className="font-primary text-xl font-semibold">
          {clientData && clientData.name}
        </h2>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => setIsFormOpen(true)}
        >
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
          {isReady && projectData.items.length != 0
            ? projectData.items.map((project) => {
                return (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    currClient={clientData}
                  />
                );
              })
            : null}
        </section>
        <div className="flex justify-around">
          <button
            id="previous"
            className="p-4 border border-black"
            onClick={() =>
              handlePageChange(currPage > 1 ? currPage - 1 : currPage)
            }
          >
            previous
          </button>
          <button
            id="forward"
            className="p-4 border border-black"
            onClick={() =>
              handlePageChange(
                projectData != null &&
                  projectData.totalCount > currPage * projectData.pageSize
                  ? currPage + 1
                  : currPage,
              )
            }
          >
            forward
          </button>
        </div>
      </div>
      {isFormOpen && (
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsFormOpen} />
          <ProjectForm
            setIsOpen={setIsFormOpen}
            mode="CREATE"
            currClient={clientData}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
