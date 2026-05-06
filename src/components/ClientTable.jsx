import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClientRow from "./ClientRow.jsx";

function ClientTable() {
  const { user } = useContext(AuthContext);
  const [clientData, setClientData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currPage = Number(searchParams.get("page") || 1);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      const clientOverviewData = await getData(
        user,
        `/client/overview/?page=${currPage}`,
      );
      setClientData(clientOverviewData);
    })();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <section className="w-full">
        <div className="w-full rounded-xl border border-gray-200 overflow-hidden font-secondary">
          <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_40px] bg-gray-50 px-4 py-3 text-sm text-gray-500">
            <span>Client Name</span>
            <span className="text-center">Active Projects</span>
            <span className="text-center">Open Deliverables</span>
            <span className="text-center">Overdue</span>
            <span />
          </div>

          {clientData?.items?.length ? (
            clientData.items.map((client) => (
              <ClientRow
                key={client.id}
                client={client}
                onClick={() => navigate(`/client/${client.id}/project`)}
              />
            ))
          ) : (
            <p className="py-6 text-center text-sm italic text-gray-400">
              No Clients Found!
            </p>
          )}
        </div>
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
              clientData != null &&
                clientData.totalCount > currPage * itemsPerPage
                ? currPage + 1
                : currPage,
            )
          }
        >
          forward
        </button>
      </div>
    </section>
  );
}

export default ClientTable;
