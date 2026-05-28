import { Briefcase, Github, Rocket, User, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import getIconFromName from "@/utils/getIconFromName.jsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/AuthHandlers.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/",
  },
  {
    label: "Clients",
    icon: "UsersIcon",
    path: "/client",
  },
  {
    label: "Deliverables",
    icon: "ClipboardListIcon",
    path: '/deliverables'
  },
];

export const AppSidebar = () => {

  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Rocket className="w-6! h-6! text-[#111111]" />
              <h1 className="font-primary text-xl font-bold uppercase">Agency Flow</h1>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-3">
              {sidebarItems.slice(0, 4).map((item, index) => {
                return (
                  <SidebarMenuItem key={index}>
                    <NavLink to={item.path} onClick={() => setOpenMobile(false)}>
                      {({ isActive }) => (
                        <SidebarMenuButton
                          isActive={isActive}
                          className="rounded-none p-5 transition-colors data-[active=true]:bg-[#e7e7e7] data-[active=true]:border-l-5 data-[active=true]:border-[#111111]"
                        >
                          {getIconFromName(item.icon, "!w-5 !h-5")}

                          <span className="uppercase tracking-wider text-sm font-semibold text-[#444444]">
                            {item.label}
                          </span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="p-5">
                  <User2 className="w-5! h-5! text-[#111111]" />
                  <span className="font-bold tracking-tight text-base text-[#111111]">
                    Admin
                  </span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none">
                <a href="https://github.com/SHREERAJ10" target="_blank">
                  <DropdownMenuItem>
                    <Briefcase />
                    Portfolio
                  </DropdownMenuItem>
                </a>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                  try {
                    await logout();
                    toast.success("Logged out successfully!");
                  }
                  catch (err) {
                    toast.error(err.message);
                  }
                }}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
