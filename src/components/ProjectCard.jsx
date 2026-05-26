import React, { startTransition, useContext, useState } from "react";
import { Progress } from "./ui/progress.jsx";
import KebabMenu from "./KebabMenu.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import Backdrop from "./Backdrop.jsx";
import { deleteRecord } from "@/utils/api.js";
import AuthContext from "@/context/AuthContext.jsx";
import ProjectForm from "./ProjectForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "./Badge.jsx";

function ProjectCard({
  id,
  name,
  status,
  status_Detail,
  deliverable,
  due_Date,
  setProjects,
  setOptimisticProjects,
  triggerRefetch
}) {
  const { clientId } = useParams();
  const projectRoute = `/client/${clientId}/project/${id}`;
  const { user } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const handleDeleteOptimisticProject = (projectId) => {
    startTransition(() => {
      setOptimisticProjects({ action: "DELETE", project: { id: projectId } });
      setProjects((projects) => { return { ...projects, items: projects?.items?.filter((project) => project.id != projectId) } });
    });
  }

  const deleteProject = async () => {
    handleDeleteOptimisticProject(id);
    await deleteRecord(user, projectRoute);
    triggerRefetch();
  };

  return (
    <div>
      <div className="mx-auto max-w-6xl border border-[#111111] bg-white p-6 shadow-sm curosr-pointer" onClick={() => navigate(`/client/${clientId}/project/${id}/deliverable`)}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-x-2">
              <h3 className="text-lg font-extrabold text-gray-900 lg:whitespace-nowrap">{name}</h3>
              <Badge>
                {status.status}
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-[#111] opacity-70">{status_Detail}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between text-sm font-semibold text-[#111]">
              <span>Deliverables</span>
              <div className="flex gap-0.5">
                <span className="text-gray-900">{deliverable?.completed || 0}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{deliverable?.total || 0}</span>
              </div>
            </div>

            <Progress
              value={(deliverable?.completed / deliverable?.total) * 100}
              className="h-2 w-full"
            />
          </div>

          <div className="flex items-start justify-end lg:ml-4">
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
            setOptimisticProjects={setOptimisticProjects}
            setProjects={setProjects}
            triggerRefetch={triggerRefetch}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
