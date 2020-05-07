import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { InputNumber } from "antd";
import SearchInput from "./SearchInput";
import { FilterContext } from "../containers/FilterContext";
import { AppContext } from "../containers/AppContext";
import "./HelpContents.css";

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
          refLookup[appState.helpTarget].current.classList.add("highlighted");
          window.setTimeout(() => {
            if (
              refLookup[appState.helpTarget] &&
              refLookup[appState.helpTarget].current
            ) {
              refLookup[appState.helpTarget].current.classList.remove(
                "highlighted"
              );
            }
          }, 3000);
        }
      }
    }
  }, [appState.helpTarget, refLookup]);

  function handleResultsPerLine(count) {
    setFilterState({ ...filterState, resultsPerLine: count });
  }

  return (
    <div ref={helpContentRef}>
      <h2 ref={refLookup.SearchInput}>Searching:</h2>
      <p>
        The search input bar is the primary interface to this website. It is
        used to locate an EM body id or cell line of interest. To that end, We
        setup the search input to default to an exact match with optional wild
        cards. For example, if you were looking for the cell line LH173,
        searching for &ldquo;LH173&rdquo; would find exactly one result for that
        cell line.
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
      <p>
        The results of this initial search will present all the images that we
        have run through the color depth MIP mask search, alongside a button to
        view the results of that search. Clicking on the &ldquo;View EM/LM
        Matches&rdquo; button will present you with all the matches to this
        input image.
      </p>

      <h2 ref={refLookup.MatchesLMtoEM}>LM to EM Matches:</h2>
      <p>
        The Light Microscopy to Electron Microscopy matches show a grid of
        images related to an Electron microscopy body from the FlyEM Project.
        They are sorted from highest to lowest scoring, with the score
        determined as follows.{" "}
      </p>
      <h2 ref={refLookup.MatchesEMtoLM}>EM to LM Matches:</h2>
      <p>
        The Electron Microscopy to Light Microscopy matches show a grid of
        images related to a cell line from one of our{" "}
        <Link to="/about">papers</Link>. They are sorted from highest to lowest
        scoring, with the score determined in the same way as the LM to EM
        matches described above.
      </p>
      <p>
        All matching images for a line are sorted together by the highest
        scoring image in that line. By default, we display a single image per
        line, but this can be adjusted in the &ldquo;results per line&rdquo;
        textbox found by clicking on the results filters button.
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