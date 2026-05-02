import { Plus } from "lucide-react";

function ActionBar({setIsFormOpen}) {
  return (
    <div className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:pr-8 md:pl-4">
      
      <h2 className="font-primary text-xl font-semibold">
        Clients
      </h2>

      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={()=>setIsFormOpen(true)}>
        <Plus size={18} />
        Add Client
      </button>

    </div>
  );
}

export default ActionBar;