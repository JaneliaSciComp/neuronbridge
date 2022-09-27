import React from "react";
import { Redirect, useParams, useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchRedirect() {
  const { searchType, matchId, page } = useParams();
  const query = useQuery();
  const algorithm = searchType === "ppp" ? "pppm" : "cdm";
  const inputType = searchType === "lines" ? "lm" : "em";

  const queryString = query.toString() !== "" ? `?${query.toString()}` : "";

  const newUrl = `/matches/${algorithm}/${inputType}/${matchId}/${page || ""}${queryString}`;
  return (<Redirect to={newUrl} />);
}
