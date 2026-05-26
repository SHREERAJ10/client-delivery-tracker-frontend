import { useNavigate } from "react-router-dom";
import ClientRow from "./ClientRow.jsx";

function ClientTable({ clients, setOptimisticClients, setClients, triggerRefetch }) {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <div className="w-full border-0 md:border md:border-gray-200 md:overflow-hidden">
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_40px] bg-gray-50 px-4 py-3 text-sm text-gray-500 uppercase font-semibold">
          <span>Client Name</span>
          <span className="text-center">Active Projects</span>
          <span className="text-center">Open Deliverables</span>
          <span className="text-center">Overdue</span>
          <span />
        </div>

        <div className="flex flex-col gap-4 md:block">
          {clients?.items?.length ? (
            clients.items.map((client) => (
              <ClientRow
                key={client.id}
                client={client}
                onClick={() => navigate(`/client/${client.id}/project`)}
                setOptimisticClients={setOptimisticClients}
                setClients={setClients}
                triggerRefetch={triggerRefetch}
              />
            ))
          ) : (
            <p className="py-6 text-center text-sm italic text-gray-400">
              No Clients Found!
            </p>
          )}
        </div>
      </div>

    </section>
  );
}

export default ClientTable;
