import React from "react";
import { Search } from "lucide-react";

function SearchBar({ placeholder, searchTerm, searchParams, setSearchTerm, setSearchParams}) {

  return (
    <div className="flex items-center w-full bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-black-500">
      <input
        type="text"
        placeholder={placeholder}
        className="peer flex-1 px-4 py-2.5 text-sm bg-transparent focus:outline-none"
        value={searchTerm}
        onChange={(e) => {
          if (e.target.value?.trim() == "") {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("searchQuery");
            setSearchParams(newParams);
          }
          setSearchTerm(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (searchTerm?.trim() != "") {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("searchQuery", searchTerm);
              setSearchParams(newParams);
            }
          }
        }}
      />

      <button
        type="button"
        onClick={() => {
          if (searchTerm?.trim() != "") {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("searchQuery", searchTerm);
            setSearchParams(newParams);
          }
        }}
        className="flex items-center justify-center px-3 text-gray-500 peer-focus:text-gray-900"
      >
        <Search size={16} />
      </button>
    </div>
  );
}

export default SearchBar;