import React, { useContext, useEffect, useRef } from "react";
import { InputNumber } from "antd";
import { FilterContext } from "../containers/FilterContext";
import { AppContext } from "../containers/AppContext";

export default function HelpPage() {
  const [filterState, setFilterState] = useContext(FilterContext);
  const [appState] = useContext(AppContext);

  const helpContentRef = useRef();

  const refLookup = {
    MatchesEMtoLM: useRef(),
    SearchInput: useRef()
  };

  // use Effect to scroll to target set in the appState?
  useEffect(() => {
    if (refLookup[appState.helpTarget]) {
      if (refLookup[appState.helpTarget].current) {
        helpContentRef.current.parentElement.scrollTop =
          refLookup[appState.helpTarget].current.offsetTop - 60;
      }
    }
  }, [appState.helpTarget, refLookup]);

  function handleResultsPerLine(count) {
    setFilterState({ ...filterState, resultsPerLine: count });
  }

  return (
    <div ref={helpContentRef}>
      <h3 ref={refLookup.SearchInput}>Searching:</h3>
      <p>
        At the moment, searching is limited to a case sensitive PREFIX search. This means that
        your query string will only match the beginning of the body Id or Line
        Name that you are searching for and only match if the case is identical.
      </p>
      <h3>LM to EM Matches:</h3>
      <h3 ref={refLookup.MatchesEMtoLM}>EM to LM Matches:</h3>
      <p>
        All matching images in a line are sorted together by the highest scoring
        image in that line. By default, we display a single image per line. This
        can be adjusted in the &ldquo;results per line&rdquo; textbox at the top
        of the results grid.
      </p>
      <div>
        <InputNumber
          style={{ width: "5em" }}
          min={1}
          max={100}
          value={filterState.resultsPerLine}
          onChange={handleResultsPerLine}
        />{" "}
        results per line
      </div>
    </div>
  );
}
