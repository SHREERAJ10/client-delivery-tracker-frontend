import { Plus } from "lucide-react";
import Button from "./Button.jsx";
import { SidebarTrigger } from "./ui/sidebar.jsx";

function ActionBar({ setIsFormOpen }) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <SidebarTrigger className="lg:hidden" />
        <h2 className="text-3xl font-bold">
          Clients
        </h2>
      </div>

      <Button onClick={() => setIsFormOpen(true)}>
        <Plus size={18} />
        Add Client
      </Button>

    </div>
  );
}

export default ActionBar;