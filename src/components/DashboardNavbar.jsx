import { Plus, Search } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar.jsx";

export default function DashboardNavbar() {
  return (
    <nav className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:pr-8 md:pl-4">

      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="text-xl font-semibold text-gray-800">Dashboard</div>
      </div>

      <div className="flex items-center gap-3">

        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition">
          <Search size={18} className="text-gray-600" />
        </button>

        <input
          type="text"
          placeholder="Search Deliveries"
          className="hidden lg:block w-48 md:w-64 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          <Plus size={16} />
          <span className="hidden sm:inline">New Delivery</span>
        </button>
      </div>
    </nav>
  );
}