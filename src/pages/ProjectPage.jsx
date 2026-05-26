import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { Plus } from "lucide-react";
import React, { useContext, useEffect, useOptimistic, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import ProjectForm from "@/components/ProjectForm.jsx";
import Backdrop from "@/components/Backdrop.jsx";
import ProjectList from "@/components/ProjectList.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function ProjectPage() {
  const { clientId } = useParams();
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currClient, setCurrClient] = useState(null);
  const [projects, setProjects] = useState({});
  const [optimisticProjects, setOptimisticProjects] = useOptimistic(projects, (currProjects, action) => {
    switch (action.type) {
      case "ADD":
        return { ...currProjects, items: [...currProjects.items, action.project] };
      case "UPDATE":
        return currProjects.items.map((project) => project.id == action.project.id ? action.project : project);
      case "DELETE":
        return currProjects.items.filter((project) => project.id != action.project.id);
      default:
        return currProjects;
    }
  });
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [statusList, setStatusList] = useState([]);
  const [currStatus, setCurrStatus] = useState("");

  const currPage = Number(searchParams.get("page") || 1);
  const statusFilter = searchParams.get("status");
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  useEffect(() => {
    (async () => {
      const client = await getData(user, `/client/${clientId}`);
      const statusList = await getData(user, "/status/?type=PROJECT");
      setCurrClient(client);
      setStatusList(statusList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const projectDetails = await getData(
        user,
        `/client/${clientId}/project/details/?page=${currPage}${(statusFilter == null) ? "" : `&status=${statusFilter}`}`,
      );
      setProjects(projectDetails);
    })();
  }, [searchParams, refetchTrigger]);

  return (
    <div className="flex flex-col gap-18 sm:gap-8 px-4 sm:px-10 pt-10 pb-6">
      <div className="flex flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <NavLink to="/client" className="uppercase font-semibold tracking-wide">
                  Client
                </NavLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="uppercase font-semibold tracking-wide">{currClient ? currClient.name : "Project"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="w-full h-16 bg-white flex flex-col items-start gap-y-4 sm:flex-row sm:items-center justify-between">
          <h2 className="font-primary text-3xl font-extrabold">
            {currClient ? currClient.name : "Project"}
          </h2>

          <button
            className="flex items-center gap-2 bg-[#111111] text-white px-4 py-2 hover:brightness-110 transition"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus size={18} />
            Add Project
          </button>
        </section>
      </div>

      <div className="flex flex-col gap-y-10">

        <section className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-4">
          <SearchBar placeholder="Search projects by name or status..." currPage={currPage} setSearchResult={setProjects} route={`/client/${clientId}/project/details`} />
          <Filter options={statusList} value={currStatus} onChange={(value) => {
            setCurrStatus(value);
            if (value != "") {
              setSearchParams({ status: value });
            }
            else {
              searchParams.delete("status");
              setSearchParams(searchParams);
            }
          }} />
        </section>
        <div>
          <ProjectList projects={optimisticProjects} setOptimisticProjects={setOptimisticProjects} setProjects={setProjects} triggerRefetch={() => setRefetchTrigger(prev => !prev)} />

        </div>
        <div className="flex justify-around">
          <button
            id="previous"
            className="px-4 py-3 text-sm text-white bg-[#111] border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
            onClick={() =>
              handlePageChange(currPage > 1 ? currPage - 1 : currPage)
            }
          >
            Previous
          </button>
          <button
            id="forward"
            className="px-4 py-3 text-sm text-white bg-[#111] border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
            onClick={() =>
              handlePageChange(
                projects != null &&
                  projects.totalCount > currPage * projects.pageSize
                  ? currPage + 1
                  : currPage,
              )
            }
          >
            Next
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
            mode="CREATE"
            setIsOpen={setIsFormOpen}
            setOptimisticProjects={setOptimisticProjects}
            setProjects={setProjects}
            triggerRefetch={() => setRefetchTrigger(prev => !prev)}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
