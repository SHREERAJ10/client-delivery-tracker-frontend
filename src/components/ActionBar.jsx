import { Plus } from "lucide-react";
import Button from "./Button.jsx";

function ActionBar({ setIsFormOpen }) {
  return (
    <div className="w-full flex items-center justify-between px-4 md:px-8">

      <h2 className="text-3xl font-bold">
        Clients
      </h2>

      <Button onClick={() => setIsFormOpen(true)}>
        <Plus size={18} />
        Add Client
      </Button>

    </div>
  );
}

export default ActionBar;