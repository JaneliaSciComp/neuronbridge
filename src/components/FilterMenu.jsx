import React, { useContext } from "react";
import PropTypes from "prop-types";
import { InputNumber, Switch, Divider, Col, Row } from "antd";

import LibraryFormatter from "./LibraryFormatter";
import { FilterContext } from "../containers/FilterContext";
import { AppContext } from "../containers/AppContext";

export default function FilterMenu({ searchType, countsByLibrary }) {
  const [filterState, setFilterState] = useContext(FilterContext);
  const [appState] = useContext(AppContext);

  function handleResultsPerLine(count) {
    setFilterState({ ...filterState, resultsPerLine: count });
  }

  function handleLibraryToggle(checked, library) {
    const existingLibraryFilters = filterState.filteredLibraries;
    if (!checked) {
      const newFilter = {};
      newFilter[library] = 1;
      const updatedFilters = Object.assign(existingLibraryFilters, newFilter);
      setFilterState({ ...filterState, filteredLibraries: updatedFilters });
    } else {
      const { [library]: omit, ...updatedFilters } = existingLibraryFilters;
      setFilterState({ ...filterState, filteredLibraries: updatedFilters });
    }
  }

  if (!appState.showFilterMenu) {
    return null;
  }

  const libraryFilterSwitches = Object.entries(countsByLibrary).map(
    ([library, count]) => {
      return (
        <p key={library}>
          <Switch
            checked={!(library in filterState.filteredLibraries)}
            onChange={checked => handleLibraryToggle(checked, library)}
          />{" "}
          <LibraryFormatter type={library} /> ({count})
        </p>
      );
    }
  );

  return (
    <div>
      <Divider orientation="left">Results Filters</Divider>
      <Row>
        <Col xs={24} md={6}>
          {searchType !== "lines" && (
            <div>
              <p>Results per line</p>
              <InputNumber
                style={{ width: "5em" }}
                min={1}
                max={100}
                value={filterState.resultsPerLine}
                onChange={handleResultsPerLine}
              />
            </div>
          )}
        </Col>
        <Col xs={24} md={12}>
          <p>Show results from libraries:</p>
          {libraryFilterSwitches}
        </Col>
      </Row>
      <Divider />
    </div>
  );
}

FilterMenu.propTypes = {
  searchType: PropTypes.string,
  countsByLibrary: PropTypes.object.isRequired
};

FilterMenu.defaultProps = {
  searchType: "lines"
};
