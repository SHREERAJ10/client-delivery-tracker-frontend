import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar.jsx";
import { AppSidebar } from "./AppSidebar.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default Layout;
