import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { InputNumber } from "antd";
import SearchInput from "./SearchInput";
import { FilterContext } from "../containers/FilterContext";
import { AppContext } from "../containers/AppContext";

export default function HelpContents({ scroll }) {
  const [filterState, setFilterState] = useContext(FilterContext);
  const [appState] = useContext(AppContext);

  const helpContentRef = useRef();

  const refLookup = {
    MatchesEMtoLM: useRef(),
    MatchesLMtoEM: useRef(),
    SearchInput: useRef()
  };

  // use Effect to scroll to target set in the appState?
  useEffect(() => {
    if (scroll) {
      if (refLookup[appState.helpTarget]) {
        if (refLookup[appState.helpTarget].current) {
          helpContentRef.current.parentElement.scrollTop =
            refLookup[appState.helpTarget].current.offsetTop - 60;
        }
      }
    }
  }, [appState.helpTarget, refLookup]);

  function handleResultsPerLine(count) {
    setFilterState({ ...filterState, resultsPerLine: count });
  }

  return (
    <div ref={helpContentRef}>
      <h2 ref={refLookup.SearchInput}>
        Searching:
      </h2>
      <p>
        Searching for your EM body id or cell line of interest should be easy.
        To that end, We setup the search input to default to an exact match with
        optional wild cards. For example, if you were looking for the cell line
        LH173, searching for &ldquo;LH173&rdquo; would find exactly one result
        for that cell line.
      </p>

      <SearchInput examples={false} searchTerm="LH173" help={false} />

      <p>
        If you were interested in looking at all the cell lines from our 2014
        mushroom body paper, then you could search with a wild card like
        &ldquo;MB*&rdquo;.
      </p>

      <SearchInput examples={false} searchTerm="MB*" help={false} />

      <p>
        Please note wild card searches are limited to the first 100 matches. To
        see more entries, please enter a more specific search term, eg:
        &ldquo;MB11*&rdquo;
      </p>

      <SearchInput examples={false} searchTerm="MB11*" help={false} />

      <h2 ref={refLookup.MatchesLMtoEM}>LM to EM Matches:</h2>
      <h2 ref={refLookup.MatchesEMtoLM}>EM to LM Matches:</h2>
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

HelpContents.propTypes = {
  scroll: PropTypes.bool
};

HelpContents.defaultProps = {
  scroll: true
};
