import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import React, { useContext, useEffect, useState } from "react";

function ClientsOverview() {
  const { user } = useContext(AuthContext);
  const [clients, setClients] = useState([]);

  console.log(clients);

  useEffect(() => {
    (async () => {
      const clientData = await getData(user, "/client");
      setClients(clientData.items);
    })();
  }, []);

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
              {clients.length !== 0 ? (
                clients.map((client, index) => (
                  <tr key={index} className="border-t text-sm hover:bg-gray-50">
                    <td className="p-4 align-middle">{client.name}</td>
                    <td className="p-4 text-center align-middle">
                      {client.project.active || 0}
                    </td>
                    <td className="p-4 text-center align-middle">
                      {client.deliverable.open  || 0}
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
          {clients.length != 0 ? (
            clients.map((client, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 bg-white"
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
      <div>
        
      </div>
    </section>
  );
}

export default ClientsOverview;
