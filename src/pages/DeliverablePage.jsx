import Backdrop from "@/components/Backdrop.jsx";
import Button from "@/components/Button.jsx";
import DeliverableForm from "@/components/DeliverableForm.jsx";
import DeliverableStats from "@/components/DeliverableStats.jsx";
import DeliverableTable from "@/components/DeliverableTable.jsx";
import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { Plus } from "lucide-react";
import React, { useContext, useEffect, useOptimistic, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function DeliverablePage() {

  const { clientId, projectId } = useParams();
  const [currProject, setCurrProject] = useState(null);
  const [currClient, setCurrClient] = useState(null);
  const { user } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deliverables, setDeliverables] = useState(null);
  const [optimisticDeliverables, setOptimisticDeliverables] = useOptimistic(deliverables, (currDeliverables, action) => {
    switch (action.type) {
      case "ADD":
        return { ...currDeliverables, items: [...currDeliverables.items, action.deliverable] };
      case "UPDATE":
        return currDeliverables.items.map((deliverable) => deliverable.id == action.deliverable.id ? action.deliverable : deliverable);
      case "DELETE":
        return currDeliverables.items.filter((deliverable) => deliverable.id != action.deliverable.id);
      default:
        return currDeliverables;
    }
  });

  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusList, setStatusList] = useState([]);
  const [currStatus, setCurrStatus] = useState("");

  const currPage = Number(searchParams.get("page") || 1);
  const statusFilter = searchParams.get("status");
  const itemsPerPage = 5;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  useEffect(() => {
    (async () => {
      const project = await getData(user, `/project/${projectId}`);
      const statusList = await getData(user, "/status/?type=DELIVERABLE");
      const client = await getData(user, `/client/${clientId}`);
      setCurrProject(project);
      setCurrClient(client);
      setStatusList(statusList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const deliverables = await getData(
        user,
        `/client/${clientId}/project/${projectId}/deliverable/?page=${currPage}${(statusFilter == null) ? "" : `&status=${statusFilter}`}`,
      );
      setDeliverables(deliverables);
    })();
  }, [searchParams, refetchTrigger]);

  return (
    <div className="flex flex-col gap-18 md:gap-8 px-4 md:px-10 pt-10 pb-6">
      <div className="flex flex-col gap-y-6">
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
              <BreadcrumbLink asChild>
                <NavLink to={`/client/${clientId}/project`} className="uppercase font-semibold tracking-wide">
                  {currClient ? currClient.name : "Client"}
                </NavLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="uppercase font-semibold tracking-wide">{currProject ? currProject.name : "Project"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className="w-full bg-white flex flex-col items-start gap-y-4 md:flex-row md:items-center justify-between">
          <h2 className="font-primary text-3xl font-extrabold">
            {currProject ? currProject.name : "Project"}
          </h2>

          <button
            className="flex items-center gap-2 bg-[#111111] text-white px-4 py-2 hover:brightness-110 transition"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus size={18} />
            Add Deliverable
          </button>
        </section>
      </div>
      <div className="flex flex-col gap-y-10">
        <section className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-4">
          <SearchBar placeholder="Search deliverables by name or status..." currPage={currPage} setSearchResult={setDeliverables} route={`/client/${clientId}/project/${projectId}/deliverable`} />
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
        <DeliverableTable deliverables={optimisticDeliverables} setOptimisticDeliverables={setOptimisticDeliverables} setDeliverables={setDeliverables} triggerRefetch={() => setRefetchTrigger(prev => !prev)} />

        <div className="flex flex-col gap-y-16">
          <div className="flex justify-around">
            <Button
              className="px-4 py-3 border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
              onClick={() =>
                handlePageChange(currPage > 1 ? currPage - 1 : currPage)
              }
            >
              previous
            </Button>
            <Button
              className="px-4 py-3 border-2 border-black hover:text-[#111] hover:bg-white transition-colors duration-150 font-semibold uppercase"
              onClick={() =>
                handlePageChange(
                  deliverables != null &&
                    deliverables.totalCount > currPage * itemsPerPage
                    ? currPage + 1
                    : currPage,
                )
              }
            >
              next
            </Button>
          </div>
          <DeliverableStats refetchTrigger={refetchTrigger} />
        </div>
      </div>
      {isFormOpen &&
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsFormOpen} />
          <DeliverableForm mode="CREATE" setIsFormOpen={setIsFormOpen} formType="DEPENDENT" setDeliverables={setDeliverables} setOptimisticDeliverables={setOptimisticDeliverables} triggerRefetch={() => setRefetchTrigger(prev => !prev)} />
        </div>
      }

    </div>
  );
}

export default DeliverablePage;
