import { useLocation } from "react-router-dom";

// eslint-disable-next-line
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
