import React, { useContext, useState } from "react";
import { Progress } from "./ui/progress.jsx";
import KebabMenu from "./KebabMenu.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import Backdrop from "./Backdrop.jsx";
import { deleteRecord } from "@/utils/api.js";
import AuthContext from "@/context/AuthContext.jsx";
import ProjectForm from "./ProjectForm.jsx";
import { useNavigate, useParams } from "react-router-dom";

function ProjectCard({
  id,
  name,
  status,
  status_Detail,
  deliverable,
  due_Date,
}) {
  const {clientId} = useParams();
  const projectRoute = `/client/${clientId}/project/${id}`;
  const { user } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const deleteProject = async () => {
    await deleteRecord(user, projectRoute);
  };

  return (
    <div>
      <div className="mx-auto w-[90%] max-w-6xl min-w-[320px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm curosr-pointer" onClick={() => navigate(`/client/${clientId}/project/${id}/deliverable`)}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-x-2">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-700/10">
                {status.status}
              </span>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-900 opacity-60">{status_Detail}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Deliverables</span>
              <div className="flex gap-0.5">
                <span className="text-gray-900">{deliverable.completed}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{deliverable.total}</span>
              </div>
            </div>

            <Progress
              value={(deliverable.completed / deliverable.total) * 100}
              className="h-2 w-full"
            />
          </div>

          <div className="flex items-start justify-end md:ml-4">
            <KebabMenu setIsDeleteOpen={setIsDialogOpen} setIsUpdateOpen={setIsUpdate} />
          </div>
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
      {isUpdate && (
        <div
          id="modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Backdrop setIsOpen={setIsUpdate} />
          <ProjectForm
            mode="UPDATE"
            setIsOpen={setIsUpdate}
            id={id}
            prefillData={{
              clientId: clientId,
              projectName: name,
              statusId: status.id,
              statusDetail: status_Detail,
              due_Date: due_Date.split('T')[0],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
