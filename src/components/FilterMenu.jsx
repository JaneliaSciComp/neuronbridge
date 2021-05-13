import React, { useContext } from "react";
import PropTypes from "prop-types";
import { InputNumber, Input, Switch, Divider, Col, Row, Radio } from "antd";

import LibraryFormatter from "./LibraryFormatter";
import { FilterContext } from "../containers/FilterContext";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

export default function FilterMenu({ searchType, countsByLibrary }) {
  const [filterState, setFilterState] = useContext(FilterContext);

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

	function onSortChange(event) {
    setFilterState({ ...filterState, sortResultsBy: event.target.value });
	}

  function handleIdFilter(event) {
    setFilterState({ ...filterState, idOrNameFilter: event.target.value });
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
      <Row>
        <Col xs={24} md={12}>
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
          <Divider orientation="left">Filter by match id or name</Divider>
          <Input placeholder="id or name string" onChange={handleIdFilter} value={filterState.idOrNameFilter} />
        </Col>
        <Col xs={24} md={12}>
          <Divider orientation="left">Sort Results By</Divider>
          <Radio.Group onChange={onSortChange} value={filterState.sortResultsBy}>
            <Radio style={radioStyle} value={1}>
              Normalized Score
            </Radio>
            <Radio style={radioStyle} value={2}>
              Matched Pixels
            </Radio>
          </Radio.Group>
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
