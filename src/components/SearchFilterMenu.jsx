import React, { useContext, useEffect } from "react";
import { Row, Col, Divider, Switch } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { AppContext } from "../containers/AppContext";
import { useQuery } from "../libs/hooksLib";

export default function SearchFilterMenu() {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();
  const { appState, setPermanent } = useContext(AppContext);

  const filteredAreas = query.getAll("saa") || [];

  // filteredAreas is first loaded from appState, if present.
  // Then it is overwritten by the url values if there are any present.
  useEffect(() => {
    if (filteredAreas.length === 0) {
      if (appState.excludedAnatomicalAreas.length !== 0) {
        appState.excludedAnatomicalAreas.forEach(area => {
          query.append("saa", area);
        });
        location.search = query.toString();
        history.replace(location);
      }
    }
  },[appState.excludedAnatomicalAreas, filteredAreas, history, location, query]);

  function handleAnatomicalAreaToggle(checked, area) {
    const areas = query.getAll("saa");
    if (!checked) {
      if (!areas.includes(area)) {
        if (!appState.excludedAnatomicalAreas.includes(area)) {
          setPermanent({
            excludedAnatomicalAreas: [...appState.excludedAnatomicalAreas, area],
          });
        }
        query.append("saa", area);
        location.search = query.toString();
        history.replace(location);
      }
    } else {
      query.delete("saa");
      setPermanent({
        excludedAnatomicalAreas: appState.excludedAnatomicalAreas.filter(
          (excluded) => excluded !== area
        ),
      });
      areas.forEach((existing) => {
        if (existing !== area) {
          query.append("saa", existing);
        }
      });
      location.search = query.toString();
      history.replace(location);
    }
  }

  const anatomicalAreaSwitches = Object.entries(
    appState.dataConfig.anatomicalAreas
  ).map(([key, value]) => {
    return (
      <p key={key}>
        {" "}
        <Switch
          checked={!filteredAreas.includes(key)}
          onChange={(checked) => handleAnatomicalAreaToggle(checked, key)}
        />{" "}
        {value.label}{" "}
      </p>
    );
  });
  if (!appState.showSearchFilters) {
    return null;
  }
  return (
    <Row gutter={6}>
      <Col xs={24}>
        <Divider orientation="left">Search Filters</Divider>
        <p>Anatomical Area</p>
        {anatomicalAreaSwitches}
      </Col>
    </Row>
  );
}
