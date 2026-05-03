import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ClientsOverview() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [clientData, setClientData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
    <section>
      <div className="w-full font-secondary">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden table-fixed">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="p-4 w-[40%]">Client Name</th>
                <th className="p-4 w-[20%] text-center">Active Projects</th>
                <th className="p-4 w-[20%] text-center">Open Deliverable</th>
                <th className="p-4 w-[20%] text-center">Overdue</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clientData != null && clientData.items.length !== 0 ? (
                clientData.items.map((client) => (
                  <tr key={client.id} className="border-t text-sm hover:bg-gray-50" onClick={()=>navigate(`/client/${client.id}/project`)}>
                    <td className="p-4 align-middle">{client.name}</td>
                    <td className="p-4 text-center align-middle">
                      {client.project.active || 0}
                    </td>
                    <td className="p-4 text-center align-middle">
                      {client.deliverable.open || 0}
                    </td>
                    <td className="p-4 text-center align-middle">
                      {client.deliverable.overdue || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-t text-base font-secondary italic text-[#3A3A3A] text-center">
                  <td colSpan="4" className="py-6">
                    No Clients Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden flex flex-col gap-4">
          {clientData != null && clientData.items.length != 0 ? (
            clientData.items.map((client) => (
              <div
                key={client.id}
                className="border border-gray-200 rounded-xl p-4 bg-white"
                onClick={()=>navigate(`/client/${client.id}/project`)}
              >
                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-500">Client Name</span>
                  <span className="font-medium">{client.name}</span>
                </div>

                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-500">Active Projects</span>
                  <span className="font-medium">{client.project.active}</span>
                </div>

                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-500">Open Deliverables</span>
                  <span className="font-medium">{client.deliverable.open}</span>
                </div>

                <div className="flex justify-between text-sm py-1">
                  <span className="text-gray-500">Overdue Deliverables</span>
                  <span className="font-medium">
                    {client.deliverable.overdue}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div>No Clients Found!</div>
          )}
        </div>
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

export default ClientsOverview;
