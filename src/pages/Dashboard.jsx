import React from "react";
import { logout } from "../utils/AuthHandlers.jsx";
import { LogOut } from "lucide-react";

function Dashboard() {
  return (
    <div>
      Dashboard
      <button
        onClick={logout}
        className="cursor-pointer flex items-center w-full"
      >
        <LogOut size={28} />
        <span className="text-xl tracking-tight font-medium text-[#454545] font-urbanist">
          Logout
        </span>
      </button>
    </div>
  );
}

export default Dashboard;
