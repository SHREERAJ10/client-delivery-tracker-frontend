import ActionBar from "@/components/ActionBar.jsx";
import ClientForm from "@/components/ClientForm.jsx";
import ClientsOverview from "@/components/ClientsOverview.jsx";
import Filter from "@/components/Filter.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import React from "react";

function ClientPage() {
  return (
    <div className="w-full h-full bg-[#f2f2f2]">
      <ActionBar />
      <section className="flex justify-between gap-4 px-5 py-4">
        <SearchBar placeholder="Search clients by name or email" />
        <Filter />
      </section>
      <ClientsOverview />
      <br />
      <br />
      <br />
      <ClientForm />
    </div>
  );
}

export default ClientPage;
