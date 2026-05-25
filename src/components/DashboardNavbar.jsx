import { Plus, Search } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardNavbar({ setIsFormOpen }) {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <nav className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:pr-8 md:pl-4">

      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="text-xl font-semibold text-gray-800">Dashboard</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full hidden lg:block max-w-sm">
          <input
            type="text"
            placeholder="Search Deliveries"
            className="w-full pl-4 pr-10 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerm?.trim() !== "") {
                navigate(`/deliverables/?searchQuery=${searchTerm}`);
              }
            }}
          />
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => {
              if (searchTerm?.trim() !== "") {
                navigate(`/deliverables/?searchQuery=${searchTerm}`);
              }
            }}
          />
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition" onClick={() => setIsFormOpen(true)}>
          <Plus size={16} />
          <span className="hidden sm:inline">New Delivery</span>
        </button>
      </div>
    </nav>
  );
}