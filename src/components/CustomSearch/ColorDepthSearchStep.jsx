import React from "react";
import PropTypes from "prop-types";
import { formatRelative, formatDistanceStrict } from "date-fns";
import StepTitle from "./StepTitle";
import LibraryFormatter from "../LibraryFormatter";

export default function ColorDepthSearchStep({ started, finished, state, librariesCountsMap }) {
  let searchEnd = "";
  let duration = "";

  if (["active", "complete"].includes(state)) {
    if (finished) {
      duration = `Duration: ${formatDistanceStrict(new Date(finished), new Date(started))}`;
      searchEnd = `Finished ${formatRelative(new Date(finished), new Date())}`;
    }
  }

  const hasLibraries = librariesCountsMap && Object.keys(librariesCountsMap).length > 0;

  return (
    <>
      <StepTitle state={state} step={4} text="Color Depth Search" />
      <p style={{ marginTop: "1em" }}>{searchEnd}</p>
      <p style={{ marginTop: "1em" }}>{duration}</p>
      {hasLibraries ? (
        <>
          <p style={{ marginTop: "1em" }}>Libraries searched:</p>
          {Object.entries(librariesCountsMap).map(([library, count]) => (
            <p key={library} style={{ marginTop: "0.5em", marginLeft: "1em" }}>
              <LibraryFormatter type={library} /> ({count})
            </p>
          ))}
        </>
      ) : null}
    </>
  );
}

ColorDepthSearchStep.propTypes = {
  state: PropTypes.string.isRequired,
  finished: PropTypes.string,
  started: PropTypes.string,
  librariesCountsMap: PropTypes.object,
};

ColorDepthSearchStep.defaultProps = {
  finished: null,
  started: null,
  librariesCountsMap: null,
};
