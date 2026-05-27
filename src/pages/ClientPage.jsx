import ActionBar from "@/components/ActionBar.jsx";
import Backdrop from "@/components/Backdrop.jsx";
import Button from "@/components/Button.jsx";
import ClientForm from "@/components/ClientForm.jsx";
import ClientTable from "@/components/ClientTable.jsx";
import Filter from "@/components/Filter.jsx";
import ProjectStats from "@/components/ProjectStats.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import React, { useContext, useEffect, useOptimistic, useState } from "react";
import { useSearchParams } from "react-router-dom";

const clientRoute = "/client/overview";

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
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  return (
    <div className="px-4 md:px-10 pt-10 pb-6 flex flex-col gap-18 md:gap-8">
      <ActionBar setIsFormOpen={setIsFormOpen} />

      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-4">
          <SearchBar placeholder="Search clients by name or email" currPage={currPage} setSearchResult={setClients} route={clientRoute} />

          <ClientTable clients={optimisticClients} setClients={setClients} setOptimisticClients={setOptimisticClients} />
        </div>

        <div className="flex flex-col gap-16">
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
                  clients != null &&
                    clients.totalCount > currPage * itemsPerPage
                    ? currPage + 1
                    : currPage,
                )
              }
            >
              next
            </Button>
          </div>
          <ProjectStats />
        </div>
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
