import React from "react";
import { Button } from "antd";
import { useMatches } from "../containers/MatchesContext";

export default function ClearMatchSelection() {
  const { state, dispatch } = useMatches();

  function handleClearAll() {
    dispatch({ type: "clear" });
  }

  return (
    <Button disabled={state.selected.length <= 0} onClick={handleClearAll}>
      Clear Selected
    </Button>
  );
}
