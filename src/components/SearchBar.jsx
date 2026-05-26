import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getData } from "@/utils/api.js";
import AuthContext from "@/context/AuthContext.jsx";

function SearchBar({ placeholder, currPage, setSearchResult, route }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchQuery') || "");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const searchQuery = searchParams.get('searchQuery');

    (async () => {
      if (searchQuery) {
        const searchResult = await getData(
          user,
          `${route}/?page=${currPage}&searchQuery=${searchQuery}`,
        );
        setSearchResult(searchResult);
      }
    })();

  }, [searchParams]);


  return (
    <div className="flex items-center w-full bg-white border border-gray-300 focus-within:ring-1 focus-within:ring-black-500">
      <input
        type="text"
        placeholder={placeholder}
        className="peer flex-1 px-4 py-2.5 text-sm bg-transparent focus:outline-none"
        value={searchTerm}
        onChange={(e) => {
          if (e.target.value?.trim() == "") {
            searchParams.delete("searchQuery");
            setSearchParams(searchParams);
          }
          setSearchTerm(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (searchTerm?.trim() != "") {
              setSearchParams({ searchQuery: searchTerm });
            }
          }
        }}
      />

      <button
        type="button"
        onClick={() => {
          if (searchTerm?.trim() != "") {
            setSearchParams({ searchQuery: searchTerm });
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