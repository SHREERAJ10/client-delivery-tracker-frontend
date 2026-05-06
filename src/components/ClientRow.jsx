import React, { useContext, useState } from "react";
import Backdrop from "./Backdrop.jsx";
import ClientForm from "./ClientForm.jsx";
import KebabMenu from "./KebabMenu.jsx";

import StatCell from "./StatCell.jsx";
import ProjectForm from "./ProjectForm.jsx";
import { deleteRecord } from "@/utils/api.js";
import AuthContext from "@/context/AuthContext.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";

function ClientRow({ client, onClick }) {
  const deleteClientRoute = `/client/${client.id}`;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const deleteProject = async () => {
    await deleteRecord(user, deleteClientRoute);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="
        grid cursor-pointer border-t border-gray-200 bg-white px-4 py-3
        hover:bg-gray-50 transition-colors

        grid-cols-2 gap-y-3
        sm:grid-cols-[2fr_1fr_1fr_1fr_40px] sm:gap-y-0 sm:items-center
      "
      >
        <div className="col-span-2 sm:col-span-1 font-medium text-sm text-gray-800">
          {client.name}
        </div>

        <StatCell label="Active Projects" value={client.project.active ?? 0} />

        <StatCell
          label="Open Deliverables"
          value={client.deliverable.open ?? 0}
        />

        <StatCell
          label="Overdue"
          value={client.deliverable.overdue ?? 0}
          highlight={client.deliverable.overdue > 0}
        />

        <div
          className="col-start-2 row-start-1 sm:col-auto sm:row-auto justify-self-end"
        >
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
            action={deleteProject}
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
          />
        </div>
      )}
    </>
  );
}

export default ClientRow;
