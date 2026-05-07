import AuthContext from "@/context/AuthContext.jsx";
import { getData } from "@/utils/api.js";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DeliverableRow from "./DeliverableRow.jsx";

function DeliverableTable({ currProject }) {
  const { clientId } = useParams();
  const { user } = useContext(AuthContext);
  const [currClient, setCurrClient] = useState(null);
  const [deliverableData, setDeliverableData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currPage = Number(searchParams.get("page") || 1);
  const itemsPerPage = 5;
  const ready = currClient && deliverableData;

  useEffect(() => {
    (async () => {
      const client = await getData(user, `/client/${clientId}`);
      setCurrClient(client);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const deliverables = await getData(
        user,
        `/client/${clientId}/project/${currProject.id}/deliverable`,
      );
      setDeliverableData(deliverables);
    })();
  }, [searchParams]);
  console.log(deliverableData);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <section className="w-full">
      <div className="w-full rounded-xl border border-gray-200 overflow-hidden font-secondary">
        <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_40px] bg-gray-50 px-4 py-3 text-sm text-gray-500">
          <span>Deliverable Name</span>
          <span className="text-center">Due Date</span>
          <span className="text-center">Status</span>
          <span className="text-center">Notes</span>
          <span />
        </div>

        {ready && deliverableData?.items?.length ? (
          deliverableData.items.map((deliverable) => (
            <DeliverableRow
              key={deliverable.id}
              id={deliverable.id}
              client={currClient}
              project={currProject}
              deliverable={deliverable}
            />
          ))
        ) : (
          <p className="py-6 text-center text-sm italic text-gray-400">
            No Deliverables Found. Add Deliverables to get Started.
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
              deliverableData != null &&
                deliverableData.totalCount > currPage * itemsPerPage
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

export default DeliverableTable;
