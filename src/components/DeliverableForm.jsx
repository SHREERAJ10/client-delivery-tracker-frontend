import AuthContext from "@/context/AuthContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input.jsx";
import { createRecord, getData, updateRecord } from "@/utils/api.js";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { convertToISOString } from "@/utils/convertToISOString.js";
import { useParams } from "react-router-dom";

function DeliverableForm({ mode, formType, prefillData, setIsFormOpen, id }) {
  const {clientId, projectId} = useParams();
  const initialData =
    mode == "UPDATE"
      ? prefillData
      : {
        deliverableName: "",
        projectId: formType == "DEPENDENT" ? projectId : "",
        statusId: "",
        due_Date: "",
        note: "",
      };

  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: initialData,
  });
  const [currClientId, setCurrClientId] = useState(formType == "DEPENDENT" ? clientId : "");
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [options, setOptions] = useState([]);
  const [statusArr, setStatusArr] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const projectData = await getData(user, "/project");
      const clients = await getData(user, "/client");
      const statusList = await getData(user, "/status/?type=DELIVERABLE");

      setClients(clients);
      setProjects(projectData);
      setOptions(projectData);
      setStatusArr(statusList);
    })();
  }, []);

  console.log(initialData)

  // filter projects based on clientId
  useEffect(() => {
    if (options.length != 0) {
      const filteredProjects =
        currClientId == ""
          ? projects
          : projects.filter((project) => {
            return project.clientId == currClientId;
          });
      setOptions(filteredProjects);
    }
  }, [currClientId]);


  return (
    <div className="relative w-full max-w-lg bg-gray-50 rounded-2xl shadow-md p-6 z-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Add Deliverable
      </h2>

      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => {
          const projectId = getValues("projectId");
          if (mode == "CREATE") {
            createRecord(
              user,
              `/client/${currClientId}/project/${projectId}/deliverable`,
              data,
            );
          }
          else if (mode == "UPDATE") {
            updateRecord(user,
              `/client/${currClientId}/project/${projectId}/deliverable/${id}`,
              data,)
          }
          setIsFormOpen(false);
        })}
      >
        <div className="flex flex-col">
          <select
            name="clientId"
            defaultValue=""
            value={currClientId}
            onChange={(e) => formType == "DEPENDENT" ? null : setCurrClientId(e.target.value)}
          >
            <option value="">All</option>
            {clients.map((client) => {
              return (
                <option value={client.id} key={client.id}>
                  {client.name}
                </option>
              );
            })}
          </select>

          <Controller
            control={control}
            name="projectId"
            render={({ field }) => {

              return (
                <Autocomplete
                  disabled={formType == "DEPENDENT" ? true : false}
                  options={options}
                  value={options.find((option) => option.id == field.value) || null}
                  onChange={(_, selectedOption) => {
                    return formType == "DEPENDENT" ? field.value : field.onChange(selectedOption ? selectedOption.id : null);

                  }
                  }
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => {
                    return option.name
                  }}
                  getOptionKey={(option) => option.id}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Projects" />
                  )}
                />
              );
            }}
          />
        </div>

        {/* Deliverable Name */}
        <Input
          label="Deliverable Name"
          name="deliverableName"
          register={register}
          required
          placeholder="Enter deliverable name"
        />
        {statusArr.length != 0 &&
          <select
            name="statusId"
            {...register("statusId", { required: "Select a Status" })}
          >
            <option value="" disabled>Please Select a Status</option>
            {statusArr.map((status) => {
              return (
                <option value={status.id} key={status.id}>
                  {status.status}
                </option>
              );
            })}
          </select>}

        {/* Due Date */}
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
          <h2>Notes</h2>
          <textarea
            name="note"
            placeholder="Optional notes..."
            {...register("note", { required: false })}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-sm rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Deliverable
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeliverableForm;
