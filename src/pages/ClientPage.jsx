import ActionBar from "@/components/ActionBar.jsx";
import Backdrop from "@/components/Backdrop.jsx";
import ClientForm from "@/components/ClientForm.jsx";
import ClientTable from "@/components/ClientTable.jsx";
import Filter from "@/components/Filter.jsx";
import ProjectStats from "@/components/ProjectStats.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import React, { useState } from "react";

function ClientPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="w-full h-full bg-[#f2f2f2]">
      <ActionBar setIsFormOpen={setIsFormOpen} />

      <div className="flex flex-col gap-y-4 py-4">
        <section className="flex justify-between gap-4 px-7">
          <SearchBar placeholder="Search clients by name or email" />
          <Filter />  
        </section>
        <section className="flex justify-between px-7">
          <ClientTable />
        </section>
        <ProjectStats />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Backdrop setIsOpen={setIsFormOpen} />
          <ClientForm setIsOpen={setIsFormOpen} mode="CREATE" />
        </div>
      )}
    </div>
  );
}

export default ClientPage;
