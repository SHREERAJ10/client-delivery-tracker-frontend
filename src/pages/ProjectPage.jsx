import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
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
import Button from "@/components/Button.jsx";
import { SidebarTrigger } from "@/components/ui/sidebar.jsx";

function ProjectPage() {
  const { clientId } = useParams();
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchQuery') || "");

  const [currClient, setCurrClient] = useState(null);
  const [projects, setProjects] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [statusList, setStatusList] = useState([]);
  const [currStatus, setCurrStatus] = useState("");

  const currPage = Number(searchParams.get("page") || 1);
  const statusFilter = searchParams.get("status");
  const searchQuery = searchParams.get('searchQuery');

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
      setIsLoading(true);
      let url = `/client/${clientId}/project/details/?page=${currPage}`;
      if (statusFilter) {
        url += `&status=${statusFilter}`;
      }
      if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
      }
      const projectDetails = await getData(user, url);
      setProjects(projectDetails);
      setIsLoading(false);
    })();
  }, [searchQuery, currPage, statusFilter]);

  useEffect(() => {
    (async () => {
      let url = `/client/${clientId}/project/details/?page=${currPage}`;
      if (statusFilter) {
        url += `&status=${statusFilter}`;
      }
      if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
      }
      const projectDetails = await getData(user, url);
      setProjects(projectDetails);
    })();
  }, [refetchTrigger]);

  return (
    <div className="flex flex-col gap-18 md:gap-8 px-4 md:px-10 pt-10 pb-6">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-6">
          <SidebarTrigger className="lg:hidden" />
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
        </div>
        <section className="w-full bg-white flex flex-col items-start gap-y-4 md:flex-row md:items-center justify-between">
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

        <section className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-4">
          <SearchBar placeholder="Search projects by name or status..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchParams={searchParams} setSearchParams={setSearchParams} />
          <Filter options={statusList} value={currStatus} onChange={(value) => {
            setCurrStatus(value);
            if (value != "") {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("status", value);
              setSearchParams(newParams);
            }
            else {
              const newParams = new URLSearchParams(searchParams);
              newParams.delete("status");
              setSearchParams(newParams);
            }
          }} />
        </section>
        <div>
          <ProjectList isLoading={isLoading} projects={projects} setProjects={setProjects} triggerRefetch={() => setRefetchTrigger(prev => !prev)} />

        </div>
        <div className="flex justify-around">
          <Button
            type="button"
            className="px-4 py-3 border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
            onClick={() =>
              handlePageChange(currPage > 1 ? currPage - 1 : currPage)
            }
          >
            Previous
          </Button>
          <Button
            type="button"
            className="px-4 py-3 border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
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
          </Button>
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
            setProjects={setProjects}
            triggerRefetch={() => setRefetchTrigger(prev => !prev)}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
