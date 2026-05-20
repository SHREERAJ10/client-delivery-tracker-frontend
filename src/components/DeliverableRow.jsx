import AuthContext from "@/context/AuthContext.jsx";
import { deleteRecord } from "@/utils/api.js";
import React, { startTransition, useContext, useState } from "react";
import DeliverableForm from "./DeliverableForm.jsx";
import StatCell from "./StatCell.jsx";
import KebabMenu from "./KebabMenu.jsx";
import { formatDate } from "@/utils/formatDate.js";
import { DeliverableNote } from "./DeliverableNote.jsx";
import Backdrop from "./Backdrop.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { useParams } from "react-router-dom";

function DeliverableRow({ deliverable, id, setOptimisticDeliverables, setDeliverables,triggerRefetch }) {
  const { clientId, projectId } = useParams();
  const deleteDeliverableRoute = `/client/${clientId}/project/${projectId}/deliverable/${id}`;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleDeleteOptimisticDeliverable = (deliverableId) => {
      startTransition(() => {
        setOptimisticDeliverables({ action: "DELETE", deliverable: { id: deliverableId } });
        setDeliverables((deliverables) => { return { ...deliverables, items: deliverables?.items?.filter((deliverable) => deliverable.id != deliverableId) } });
      });
    }

  const deleteDeliverable = async () => {
    handleDeleteOptimisticDeliverable(id);
    await deleteRecord(user, deleteDeliverableRoute);
    triggerRefetch();
  };

  return (
    <>
      <div
        className="
          grid cursor-pointer border-t border-gray-200 bg-white px-4 py-3
          hover:bg-gray-50 transition-colors
  
          grid-cols-2 gap-y-3
          sm:grid-cols-[2fr_1fr_1fr_1fr_40px] sm:gap-y-0 sm:items-center
        "
      >
        <div className="col-span-2 sm:col-span-1 font-medium text-sm text-gray-800">
          {deliverable.name}
        </div>

        <StatCell label="Due Date" value={formatDate(deliverable.due_Date) ?? 0} />

        <StatCell
          label="Status"
          value={deliverable.status.status}
        />

        <StatCell
          label="Notes"
        >
          <DeliverableNote note={deliverable.note} />
        </StatCell>

        <div
          className="col-start-2 row-start-1 sm:col-auto sm:row-auto justify-self-end"
          onClick={(e) => e.stopPropagation()}
        >
          <KebabMenu
            setIsUpdateOpen={setIsFormOpen}
            setIsDeleteOpen={setIsDialogOpen}
          />
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
              action={deleteDeliverable}
            />
          </div>
        )}
      </div>

      {isFormOpen && (
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsFormOpen} />
          <DeliverableForm
            setIsFormOpen={setIsFormOpen}
            mode="UPDATE"
            formType="DEPENDENT"
            prefillData={{
              deliverableName: deliverable.name,
              projectId: projectId,
              statusId: deliverable.status.id,
              due_Date: (deliverable.due_Date).split('T')[0],
              note: deliverable.note,
            }}
            id={id}
            setOptimisticDeliverables={setOptimisticDeliverables}
            setDeliverables={setDeliverables}
            triggerRefetch={triggerRefetch}
          />
        </div>
      )}
    </>
  );
}

export default DeliverableRow;
