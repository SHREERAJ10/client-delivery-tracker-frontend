import React from "react";
import { Search } from "lucide-react";

function SearchBar({ placeholder }) {
  return (
    <div className="relative w-full">
      
      <input
        type="text"
        placeholder={placeholder}
        className="bg-white w-full px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Search
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

    </div>
  );
}

export default SearchBar;