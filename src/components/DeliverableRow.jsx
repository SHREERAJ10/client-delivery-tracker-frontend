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
import Badge from "./Badge.jsx";

function DeliverableRow({ deliverable, id, setOptimisticDeliverables, setDeliverables, triggerRefetch }) {
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
          grid border border-b-2 border-r-4 border-[#111] bg-white px-4 py-3
          hover:bg-gray-50 transition-colors
  
          grid-cols-2 gap-y-3 md:border-0 md:border-t md:border-gray-200
          md:grid-cols-[2fr_1fr_1fr_1fr_40px] md:gap-y-0 md:items-center
        "
      >

        <div className="text-sm font-bold text-[#111]">
          {deliverable.name}
        </div>

        <div className="grid grid-cols-3 gap-2 col-span-2 md:contents">
          <StatCell label="Due Date">{formatDate(deliverable.due_Date) ?? 0}</StatCell>
          <StatCell label="Status">
            <Badge>{deliverable.status.status}</Badge>
          </StatCell>
          <StatCell label="Notes">
            <DeliverableNote note={deliverable.note} />
          </StatCell>
        </div>

        <div
          className="col-start-2 row-start-1 md:col-auto md:row-auto justify-self-end"
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
