import React from "react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function KebabMenu({ setIsUpdateOpen, setIsDeleteOpen }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-gray-100">
            <EllipsisVertical className="h-5 w-5 text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-none">
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            setIsUpdateOpen(true);
          }}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            setIsDeleteOpen(true);
          }}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default KebabMenu;
