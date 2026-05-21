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
    <div className="relative w-full">

      <input
        type="text"
        placeholder={placeholder}
        className="bg-white w-full px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => {
          if ((e.target.value)?.trim() == "") {
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
        }
        }
      />

      <Search
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={() => {
          if (searchTerm?.trim() != "") {
            setSearchParams({ searchQuery: searchTerm });
          }
        }}
      />

    </div>
  );
}

export default SearchBar;