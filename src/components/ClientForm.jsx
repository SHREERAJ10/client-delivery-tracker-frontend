import { useForm } from "react-hook-form";
import { createRecord, updateRecord } from "@/utils/api.js";
import { startTransition, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { toast } from "sonner";

export default function ClientForm({ setIsOpen, mode, prefillData, id, setClients, triggerRefetch }) {
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
      setClients((clients) => { return { ...clients, items: [optimisticClient, ...clients.items] } })
    })
  }
  const handleUpdateOptimisticClient = (optimisticClient) => {
    startTransition(() => {
      setClients((clients) => {
        return { ...clients, items: clients?.items?.map((client) => client.id == optimisticClient.id ? optimisticClient : client) }
      });
    })

  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="relative w-full max-w-md flex items-center justify-center z-80">
      <div className="w-full max-w-md bg-white shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#111] mb-6">
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
            let response;
            try {
              if (mode == "CREATE") {
                handleAddOptimisticClient(optimisticClient);
                setIsOpen(false);
                response = await createRecord(user, createRoute, data);
              } else if (mode == "UPDATE") {
                handleUpdateOptimisticClient(optimisticClient);
                setIsOpen(false);
                response = await updateRecord(user, updateRoute, data);
              }
              toast.success(response.message);
            }
            catch (err) {
              setIsOpen(true);
              toast.error(err.message);
            }
            finally {
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
              Save Client
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
