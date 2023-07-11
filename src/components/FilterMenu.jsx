import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  InputNumber,
  Input,
  Switch,
  Divider,
  Col,
  Row,
  Radio,
} from "antd";
import { useLocation, useHistory } from "react-router-dom";

import LibraryFormatter from "./LibraryFormatter";
import { useQuery } from "../libs/hooksLib";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const genderOptions = [
  {
    label: "Male",
    value: "m",
  },
  {
    label: "Female",
    value: "f",
  },
];

export default function FilterMenu({
  matchesType,
  searchAlgorithm,
  countsByLibrary,
  useGenderFilter,
}) {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const handleResultsPerLine = (count) => {
    query.set("rpl", count);
    location.search = query.toString();
    history.push(location);
  }

  function handleLibraryToggle(checked, library) {
    // get all the existing values for the query,
    const libs = query.getAll("xlib");
    if (!checked) {
      // if the lib isn't already in the URL
      if (!libs.includes(library)) {
        // update the URL.
        query.append("xlib", library);
        location.search = query.toString();
        history.push(location);
      }
    } else {
      // remove any that have been checked
      query.delete("xlib");
      libs.forEach((lib) => {
        if (lib !== library) {
          query.append("xlib", lib);
        }
      });
      location.search = query.toString();
      history.push(location);
    }
  }

  const onSortChange = (event) => {
    query.set("fisort", event.target.value);
    location.search = query.toString();
    history.push(location);
  }

  const handleIdFilter = (event) => {
    query.set("id", event.target.value);
    location.search = query.toString();
    history.push(location);
  }

  const handleGenderFilter = (checkedValues) => {
    query.set("gr", checkedValues.join(""));
    location.search = query.toString();
    history.push(location);
  }

  const filteredLibs = query.getAll("xlib") || [];

  let genderValue = ["m", "f"];
  if (query.get("gr") !== null) {
    genderValue = query.get("gr").split("");
  }

  const libraryFilterSwitches = Object.entries(countsByLibrary).map(
    ([library, count]) => (
      <p key={library}>
        <Switch
          checked={!filteredLibs.includes(library)}
          onChange={(checked) => handleLibraryToggle(checked, library)}
        />{" "}
        <LibraryFormatter type={library} /> ({count})
      </p>
    )
  );

  return (
    <div>
      <Row>
        <Col xs={24} md={12}>
          <Divider orientation="left">Results Filters</Divider>
          <Row>
            <Col xs={24} md={6}>
              {matchesType === "lm" && (
                <div>
                  <p>Results per line</p>
                  <InputNumber
                    style={{ width: "5em" }}
                    min={1}
                    max={100}
                    value={parseInt(query.get("rpl") || 1, 10)}
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
          <Divider orientation="left">Filter by:</Divider>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <p>Match id or Name</p>
              <Input
                placeholder="id or name string"
                onChange={handleIdFilter}
                value={query.get("id") || ""}
              />
            </Col>
            {useGenderFilter ? (
              <Col xs={24} md={6}>
                <p>Gender</p>
                <Checkbox.Group
                  options={genderOptions}
                  value={genderValue}
                  onChange={handleGenderFilter}
                />
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <Divider orientation="left">Sort Results By</Divider>
          <Radio.Group
            onChange={onSortChange}
            value={parseInt(query.get("fisort") || 1, 10)}
          >
            <Radio style={radioStyle} value={1}>
              {searchAlgorithm === "pppm" ? "Rank" : "Normalized Score"}
            </Radio>
            {searchAlgorithm !== "pppm" ? (
              <Radio style={radioStyle} value={2}>
                Matched Pixels
              </Radio>
            ) : (
              ""
            )}
          </Radio.Group>
        </Col>
      </Row>
      <Divider />
    </div>
  );
}

FilterMenu.propTypes = {
  matchesType: PropTypes.string,
  searchAlgorithm: PropTypes.string.isRequired,
  countsByLibrary: PropTypes.object.isRequired,
  useGenderFilter: PropTypes.bool.isRequired,
};

FilterMenu.defaultProps = {
  matchesType: "em",
};
