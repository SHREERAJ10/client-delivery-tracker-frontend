import ActionBar from "@/components/ActionBar.jsx";
import Backdrop from "@/components/Backdrop.jsx";
import ClientForm from "@/components/ClientForm.jsx";
import ClientTable from "@/components/ClientTable.jsx";
import Filter from "@/components/Filter.jsx";
import ProjectStats from "@/components/ProjectStats.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import React, { useContext, useEffect, useOptimistic, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ClientPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [clients, setClients] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const [optimisticClients, setOptimisticClients] = useOptimistic(clients, (currClients, action) => {
    switch (action.type) {
      case "ADD":
        return { ...currClients, items: [...currClients.items, action.client] };
      case "UPDATE":
        return currClients.items.map((client) => client.id == action.client.id ? action.client : client);
      case "DELETE":
        return currClients.items.filter((client) => client.id != action.client.id);
      default:
        return currClients;
    }
  });

  useEffect(() => {
    (async () => {
      const clientOverviewData = await getData(
        user,
        `/client/overview/?page=${currPage}`,
      );
      setClients(clientOverviewData);
    })();
  }, [searchParams, refetchTrigger]);

  const currPage = Number(searchParams.get("page") || 1);
  const itemsPerPage = 5;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className="w-full h-full bg-[#f2f2f2]">
      <ActionBar setIsFormOpen={setIsFormOpen} />

      <div className="flex flex-col gap-y-4 py-4">
        <section className="flex justify-between gap-4 px-7">
          <SearchBar placeholder="Search clients by name or email" />
          <Filter />
        </section>
        <section className="flex justify-between px-7">
          <ClientTable clients={optimisticClients} setClients={setClients} setOptimisticClients={setOptimisticClients} triggerRefetch={() => setRefetchTrigger(prev => !prev)} />
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
                clients != null &&
                  clients.totalCount > currPage * itemsPerPage
                  ? currPage + 1
                  : currPage,
              )
            }
          >
            forward
          </button>
        </div>
        <ProjectStats />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Backdrop setIsOpen={setIsFormOpen} />
          <ClientForm setIsOpen={setIsFormOpen} mode="CREATE" setClients={setClients} setOptimisticClients={setOptimisticClients} triggerRefetch={() => setRefetchTrigger(prev => !prev)} />
        </div>
      )}
    </div>
  );
}

export default ClientPage;
