import AuthContext from "@/context/AuthContext.jsx";
import React, { startTransition, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input.jsx";
import { createRecord, getData, updateRecord } from "@/utils/api.js";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { convertToISOString } from "@/utils/convertToISOString.js";
import { useParams } from "react-router-dom";
import Button from "./Button.jsx";
import { toast } from "sonner";
import { deliverableSchema } from "@/utils/schema.js";
import { zodResolver } from "@hookform/resolvers/zod";

function DeliverableForm({ mode, formType, prefillData, setIsFormOpen, id, setDeliverables, triggerRefetch = () => { } }) {
  const { clientId, projectId } = useParams();

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

  const { register, handleSubmit, control, getValues, formState: { errors } } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(deliverableSchema),
  });
  const [currClientId, setCurrClientId] = useState(formType == "DEPENDENT" ? clientId : "");
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [options, setOptions] = useState([]);
  const [statusArr, setStatusArr] = useState([]);

  const { user } = useContext(AuthContext);

  const handleAddOptimisticDeliverable = (optimisticDeliverable) => {
    startTransition(() => {
      setDeliverables((deliverables) => { return { ...deliverables, items: [optimisticDeliverable, ...deliverables.items] } });
    });
  }

  const handleUpdateOptimisticDeliverable = (optimisticDeliverable) => {
    startTransition(() => {
      setDeliverables((deliverables) => {
        return { ...deliverables, items: deliverables?.items?.map((deliverable) => deliverable.id == optimisticDeliverable.id ? optimisticDeliverable : deliverable) }
      });
    });
  }

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

  // filter projects based on clientId
  useEffect(() => {
    const filteredProjects =
      currClientId == ""
        ? projects
        : projects.filter((project) => {
          return project.clientId == currClientId;
        });
    setOptions(filteredProjects);

  }, [currClientId]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg bg-gray-50 shadow-md p-6 z-10">
      <h2 className="text-xl font-semibold text-[#111] mb-6">
        {mode == "UPDATE" ? "Update" : "Add"} Deliverable
      </h2>

      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          let response;
          const projectId = getValues("projectId");
          const optimisticDeliverable = {
            id: id || crypto.randomUUID(),
            name: data.deliverableName,
            status: {
              status: "Loading...",
              id: data.statusId
            },
            due_Date: data.due_Date,
            note: data.note
          }

          try {
            if (mode == "CREATE") {
              if (formType == "DEPENDENT") {
                handleAddOptimisticDeliverable(optimisticDeliverable);
              }
              setIsFormOpen(false);
              response = await createRecord(
                user,
                `/client/${currClientId}/project/${projectId}/deliverable`,
                data,
              );
            }
            else if (mode == "UPDATE") {
              handleUpdateOptimisticDeliverable(optimisticDeliverable);
              setIsFormOpen(false);
              response = await updateRecord(user,
                `/client/${currClientId}/project/${projectId}/deliverable/${id}`,
                data,);
            }
            toast.success(response.message);
          }
          catch (err) {
            setIsFormOpen(true);
            toast.error(err.message);
          }
          finally {
            triggerRefetch();
          }
        })}
      >
        <div className="flex flex-col gap-y-4">

          <select
            name="clientId"
            required
            value={currClientId}
            onChange={(e) => formType == "DEPENDENT" ? null : setCurrClientId(e.target.value)}
            className="outline outline-gray-300 bg-white p-2 focus:outline-[#111]"
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
                <div className="flex flex-col gap-1.5">
                  <Autocomplete
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "white"

                      },

                      "& .MuiInputLabel-root": {
                        fontSize: "14px",
                        top: "-1px",
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#111",
                      },

                      "& .MuiOutlinedInput-root": {
                        padding: "2px",

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#111",
                        },
                      },
                    }}
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
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Projects" />
                    )}
                  />
                  {errors.projectId && <p className="text-sm text-red-500">{errors.projectId.message}</p>}
                </div>
              );
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Input
            label="Deliverable Name"
            name="deliverableName"
            register={register}
            required
            placeholder="Enter deliverable name"
          />
          {errors.deliverableName && <p className="text-sm text-red-500">{errors.deliverableName.message}</p>}
        </div>

        <Controller
          name="statusId"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <select
                {...field} disabled={statusArr.length === 0}
                className="outline outline-gray-300 bg-white p-2 focus:outline-[#111] w-full"
              >
                <option value="" disabled>Please Select a Status</option>
                {statusArr.map((status) => {
                  return (
                    <option value={status.id} key={status.id}>
                      {status.status}
                    </option>
                  );
                })}
              </select>
              {errors.statusId && <p className="text-sm text-red-500">{errors.statusId.message}</p>}
            </div>
          )}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-600">
            Due Date
          </label>
          <div className="flex flex-col gap-1.5">
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
            {errors.due_Date && <p className="text-sm text-red-500">{errors.due_Date.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h2>Notes</h2>
          <div className="flex flex-col gap-1.5">
            <textarea
              name="note"
              placeholder="Optional notes..."
              {...register("note", { required: false })}
              className="w-full p-1 outline outline-gray-300 focus:outline-[#111]"
              rows="4"
            />
            {errors.note && <p className="text-sm text-red-500">{errors.note.message}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>

          <Button type="submit">
            Save Deliverable
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DeliverableForm;
