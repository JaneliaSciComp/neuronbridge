import React from "react";
import { useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

function SearchTabs() {
  const { searchTerm, searchType } = useParams();

  return (
    <div className="card-container">
      <SearchInput searchTerm={searchTerm} />
      <SearchResults searchTerm={searchTerm} searchType={searchType} />
    </div>
  );
}

export default SearchTabs;
