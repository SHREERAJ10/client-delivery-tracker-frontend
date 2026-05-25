import Backdrop from "@/components/Backdrop.jsx";
import DeliverableForm from "@/components/DeliverableForm.jsx";
import DeliverableStats from "@/components/DeliverableStats.jsx";
import DeliverableTable from "@/components/DeliverableTable.jsx";
import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import { Plus } from "lucide-react";
import React, { useContext, useEffect, useOptimistic, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function DeliverablePage() {

  const { clientId, projectId } = useParams();
  const [currProject, setCurrProject] = useState(null);
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
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    (async () => {
      const project = await getData(user, `/project/${projectId}`);
      const statusList = await getData(user, "/status/?type=DELIVERABLE");
      setCurrProject(project);
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
    <div>
      <div className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:pr-8 md:pl-4">
        <h2 className="font-primary text-xl font-semibold">
          {currProject && currProject.name}
        </h2>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={18} />
          Add Deliverable
        </button>
      </div>
      <div className="flex flex-col gap-y-4 py-4">
        <section className="flex justify-between gap-4 px-7">
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
        <section className="flex justify-between px-7">
          <DeliverableTable deliverables={optimisticDeliverables} setOptimisticDeliverables={setOptimisticDeliverables} setDeliverables={setDeliverables} triggerRefetch={() => setRefetchTrigger(prev => !prev)} />
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
                deliverables != null &&
                  deliverables.totalCount > currPage * itemsPerPage
                  ? currPage + 1
                  : currPage,
              )
            }
          >
            forward
          </button>
        </div>
      </div>
      <DeliverableStats refetchTrigger={refetchTrigger} />
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
