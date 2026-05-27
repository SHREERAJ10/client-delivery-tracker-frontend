import React, { startTransition, useContext, useState } from "react";
import Backdrop from "./Backdrop.jsx";
import ClientForm from "./ClientForm.jsx";
import KebabMenu from "./KebabMenu.jsx";

import StatCell from "./StatCell.jsx";
import { deleteRecord } from "@/utils/api.js";
import AuthContext from "@/context/AuthContext.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";

function ClientRow({ client, setClients, setOptimisticClients, triggerRefetch }) {
  const deleteClientRoute = `/client/${client.id}`;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleDeleteOptimisticProject = (clientId) => {
    startTransition(() => {
      setOptimisticClients({ action: "DELETE", client: { id: clientId } });
      setClients((clients) => { return { ...clients, items: clients?.items?.filter((client) => client.id != clientId) } });
    });
  }

  const deleteClient = async () => {
    handleDeleteOptimisticProject(client.id);
    await deleteRecord(user, deleteClientRoute);
    triggerRefetch();
  };

  return (
    <>
      <div
        className="
    grid cursor-pointer bg-white px-4 py-3
    hover:bg-gray-50 transition-colors

    border border-b-2 border-r-4 border-[#111]
    md:rounded-none md:border-0 md:border-t md:border-gray-200

    grid-cols-2 gap-y-3
    md:grid-cols-[2fr_1fr_1fr_1fr_40px] md:gap-y-0 md:items-center
  "
      >
        <div className="text-sm font-bold text-[#111]">
          {client.name}
        </div>

        <div className="grid grid-cols-3 gap-2 col-span-2 md:contents">
          <StatCell label="Projects">{client?.project?.active ?? 0}</StatCell>
          <StatCell label="Deliverables">{client?.deliverable?.open ?? 0}</StatCell>
          <StatCell label="Overdue">
            <span className={client?.deliverable?.overdue > 0 ? "font-bold" : ""}>
              {client?.deliverable?.overdue ?? 0}
            </span>
          </StatCell>
        </div>

        <div className="col-start-2 row-start-1 md:col-auto md:row-auto justify-self-end">
          <KebabMenu setIsUpdateOpen={setIsFormOpen} setIsDeleteOpen={setIsDialogOpen} />
        </div>
      </div>
      {isDialogOpen && (
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsDialogOpen} />
          <ConfirmDialog
            dialogText="Are you sure you want to delete it?"
            setIsOpen={setIsDialogOpen}
            action={deleteClient}
          />
        </div>
      )}
      {isFormOpen && (
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsFormOpen} />
          <ClientForm
            setIsOpen={setIsFormOpen}
            mode="UPDATE"
            prefillData={{
              clientName: client.name,
              email: client.email,
            }}
            id={client.id}
            setOptimisticClients={setOptimisticClients}
            setClients={setClients}
            triggerRefetch={triggerRefetch}
          />
        </div>
      )}
    </>
  );
}

export default ClientRow;
