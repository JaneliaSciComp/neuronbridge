import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { useMatches } from "../../containers/MatchesContext";

export default function DownloadZipCheckbox({ matchId }) {
  const { state, dispatch } = useMatches();
  const handleDownloadChoice = e => {
    if (e.target.checked) {
      dispatch({ type: "add", payload: matchId });
    } else {
      dispatch({ type: "remove", payload: matchId });
    }
  };

  return (
    <span style={{ float: "right" }}>
      <Checkbox
        onChange={handleDownloadChoice}
        checked={state.selected.includes(matchId)}
      >
        Add to .zip Download{" "}
      </Checkbox>
    </span>
  );
}

DownloadZipCheckbox.propTypes = {
  matchId: PropTypes.string.isRequired
};
