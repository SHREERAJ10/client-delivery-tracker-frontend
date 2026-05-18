import { useForm } from "react-hook-form";
import { createRecord, updateRecord } from "@/utils/api.js";
import { startTransition, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext.jsx";
import Input from "./Input.jsx";

export default function ClientForm({ setIsOpen, mode, prefillData, id, setOptimisticClients, setClients, triggerRefetch }) {
  const createRoute = `/client`;
  const updateRoute = `/client/${id}`;
  const initialData =
    mode == "UPDATE"
      ? prefillData
      : {
        clientName: "",
        email: "",
      };

  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });
  const { user } = useContext(AuthContext);

  const handleAddOptimisticClient = (optimisticClient) => {
    startTransition(() => {
      setOptimisticClients({ action: "ADD", client: optimisticClient });
      setClients((clients) => { return { ...clients, items: [optimisticClient, ...clients.items] } })
    });
  }
  const handleUpdateOptimisticClient = (optimisticClient) => {
    startTransition(() => {
      setOptimisticClients({ action: "UPDATE", client: optimisticClient });
      setClients((clients) => {
        return { ...clients, items: clients?.items?.map((client) => client.id == optimisticClient.id ? optimisticClient : client) }
      });
    });
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="relative w-full max-w-md z-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {mode == "UPDATE" ? "Update" : "Add"} Client
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(async (data) => {
            const optimisticClient = {
              id: id || crypto.randomUUID(),
              name: data.clientName,
              email: data.email,
            }

            if (mode == "CREATE") {
              handleAddOptimisticClient(optimisticClient);
              setIsOpen(false);
              await createRecord(user, createRoute, data);
              triggerRefetch();
            } else if (mode == "UPDATE") {
              handleUpdateOptimisticClient(optimisticClient);
              setIsOpen(false);
              await updateRecord(user, updateRoute, data);
              triggerRefetch();
            }
          })}
        >
          <Input
            type="text"
            label="Client Name"
            name="clientName"
            register={register}
            required
            placeholder="Enter client name"
          />

          <Input
            type="email"
            label="Email"
            name="email"
            register={register}
            required
            placeholder="Enter email"
          />

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
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
