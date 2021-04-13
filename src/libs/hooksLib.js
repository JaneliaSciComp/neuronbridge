import { useState } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useMatches() {
  const [matches, setMatches] = useState([]);
  return [matches, setMatches];
}
