import AuthContext from "@/context/AuthContext.jsx";
import { createRecord, getData, updateRecord } from "@/utils/api.js";
import React, { startTransition, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input.jsx";
import { convertToISOString } from "@/utils/convertToISOString.js";
import { useParams } from "react-router-dom";
import Button from "./Button.jsx";

function ProjectForm({ mode, setIsOpen, id, prefillData, setProjects, triggerRefetch }) {
  const { clientId } = useParams();

  const createRoute = `/client/${clientId}/project`;
  const updateRoute = `/client/${clientId}/project/${id}`;

  const [currClient, setCurrClient] = useState(null);
  const [statusArr, setStatusArr] = useState([]);

  const { user } = useContext(AuthContext);

  const initialData =
    mode == "UPDATE"
      ? prefillData
      : {
        projectName: "",
        clientId: clientId,
        statusId: "",
        statusDetail: "",
        due_Date: "",
      };

  const { register, handleSubmit, control } = useForm({
    defaultValues: initialData,
  });

  const handleAddOptimisticProject = (optimisticProject) => {
    startTransition(() => {
      setProjects((projects) => { return { ...projects, items: [...projects.items, optimisticProject] } }
      )
    });
  }
  const handleUpdateOptimisticProject = (optimisticProject) => {
    startTransition(() => {
      setProjects((projects) => {
        return { ...projects, items: projects?.items?.map((project) => project.id == optimisticProject.id ? optimisticProject : project) }
      });
    });
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    (async () => {
      const statusList = await getData(user, "/status/?type=PROJECT");
      const client = await getData(user, `/client/${clientId}`);
      setStatusArr(statusList);
      setCurrClient(client);
    })();
  }, []);


  return (
    <div className="relative w-full max-w-md z-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#111] mb-6">
          {mode == "UPDATE" ? "Update" : "Add"} Project
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(async (data) => {
            console.log("click project")

            const optimisticProject = {
              id: id || "temporary",
              name: data.projectName,
              status: {
                status: "Loading...",
                id: data.statusId
              },
              status_Detail: data.statusDetail,
              due_Date: data.due_Date
            }
            if (mode == "CREATE") {
              handleAddOptimisticProject(optimisticProject);
              await createRecord(user, createRoute, data);
              triggerRefetch();
            } else if (mode == "UPDATE") {
              handleUpdateOptimisticProject(optimisticProject);
              await updateRecord(user, updateRoute, data);
              triggerRefetch();
            }
            setIsOpen(false);
          })}
        >
          {currClient &&
            <select
              name="clientId"
              id="clientId"
              {...register("clientId", { required: true })}
              className="outline outline-gray-300 bg-white p-2 focus:outline-[#111] w-full"
            >
              <option value={currClient.id}>{currClient.name}</option>
            </select>
          }

          <Input
            type="text"
            label="Project Name"
            name="projectName"
            register={register}
            required
            placeholder="Enter project name"
          />


          <Controller
            name="statusId"
            control={control}
            render={({ field }) => (
              <select
                {...field} disabled={statusArr.length === 0}
                className="outline outline-gray-300 bg-white p-2 focus:outline-[#111] w-full"
              >
                <option value="" disabled>
                  Please Select a Status
                </option>
                {statusArr.map((status) => {
                  return (
                    <option value={status.id} key={status.id}>
                      {status.status}
                    </option>
                  );
                })}
              </select>
            )}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              type="date"
              name="due_Date"
              className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 outline-none transition focus-within:ring-1 focus-within:ring-black-500"
              {...register("due_Date", {
                setValueAs: (value) =>
                  value != "" ? convertToISOString(value) : null,
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h2>Status Detail</h2>
            <textarea
              name="statusDetail"
              placeholder="Status Detail"
              {...register("statusDetail", {
                required: true,
                minLength: 1,
                maxLength: 100,
              })}
              className="w-full p-1 outline outline-gray-300 focus:outline-[#111]"
              rows="4"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
            >
              {mode == "UPDATE" ? "Save" : "Add"} Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
