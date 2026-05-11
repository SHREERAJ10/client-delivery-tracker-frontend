import AuthContext from "@/context/AuthContext.jsx";
import { createRecord, getData, updateRecord } from "@/utils/api.js";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input.jsx";
import { convertToISOString } from "@/utils/convertToISOString.js";
import { useParams } from "react-router-dom";

function ProjectForm({ mode, setIsOpen, id, prefillData }) {
  const { clientId } = useParams();

  const createRoute = `/client/${clientId}/project`;
  const updateRoute = `/client/${clientId}/project/${id}`;
  
  const [currClient, setCurrClient] = useState(null);
  const [statusArr, setStatusArr] = useState(null);

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

  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });
  

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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {mode == "UPDATE" ? "Update" : "Add"} Project
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit((data) => {
            if (mode == "CREATE") {
              createRecord(user, createRoute, data);
            } else if (mode == "UPDATE") {
              updateRecord(user, updateRoute, data);
            }
            setIsOpen(false);
          })}
        >
          {currClient &&
            <select
              name="clientId"
              id="clientId"
              {...register("clientId", { required: true })}
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
          {statusArr != null &&
            <select
              name="statusId"
              id="statusId"
              defaultValue=""
              {...register("statusId", { required: "Select a Status" })}
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
            </select>}


          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              Due Date
            </label>
            <input
              type="date"
              name="due_Date"
              className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-xl shadow-sm outline-none transition
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register("due_Date", {
                setValueAs: (value) =>
                  value != "" ? convertToISOString(value) : null,
                required: true,
              })}
            />
          </div>

          <div>
            <h2>Status Details</h2>
            <textarea
              name="statusDetail"
              placeholder="Status Details"
              {...register("statusDetail", {
                required: true,
                minLength: 1,
                maxLength: 100,
              })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {mode == "UPDATE" ? "Save" : "Add"} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
