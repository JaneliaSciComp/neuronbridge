import React from "react";
import { useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import MatchesLoader from "./MatchesLoader";

export default function SearchMatches() {
  const { algorithm } = useParams();
  return (
    <div>
      <SearchInput />
      <MatchesLoader
        searchAlgorithm={algorithm}
      />
    </div>

  );
}
