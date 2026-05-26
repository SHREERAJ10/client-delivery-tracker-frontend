import { Plus, Search } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardNavbar({ setIsFormOpen }) {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <nav className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:px-8">

      <div className="flex items-center gap-3">
        <SidebarTrigger className="lg:hidden" />
        <div className="text-2xl font-bold">Delivery Dashboard</div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative w-full hidden lg:block max-w-sm">
          <input
            type="text"
            placeholder="Search Deliveries"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black-500"
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

        <button className="flex items-center justify-between gap-2 bg-black text-white p-4 sm:pl-2 sm:pr-4 py-2 text-sm hover:brightness-110 transition whitespace-nowrap" onClick={() => setIsFormOpen(true)}>
          <Plus size={20} />
          <span className="hidden sm:inline text-sm font-semibold">New Delivery</span>
        </button>
      </div>
    </nav>
  );
}