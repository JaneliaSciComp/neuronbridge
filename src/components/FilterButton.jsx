import React, { useContext } from "react";
import {
  Button,
  Badge,
  Tooltip } from "antd";
import deepEqual from "deep-equal";
import { faFilter } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../containers/AppContext";
import { useQuery } from "../libs/hooksLib";

export default function FilterButton() {

  const [appState, setAppState] = useContext(AppContext);

  function handleFilterMenuVisability() {
    setAppState({ ...appState, showFilterMenu: !appState.showFilterMenu });
  }

  // Work out how many filters have been applied by checking the
  // differences between the keys in the filter state, vs the keys
  // in the default of the state.
  const defaults =  {
    rpl: ["1"], // resultsPerLine
    fisort: ["1"], // sortResultsBy
    xlib: [], // filteredLibraries
    id: [""] // idOrNameFilter
  };

  const query = useQuery();

  let count = 0;
  Object.keys(defaults).forEach(key => {
    if (query.has(key)) {
      const values = query.getAll(key);
      if (!deepEqual(defaults[key], values)) {
        count += 1;
      }
    }
  });


  return (
    <Tooltip title="filter results">
      <Badge count={count}>
        <Button icon={<FontAwesomeIcon icon={faFilter} />} onClick={handleFilterMenuVisability}>
          Filters / Sorting
        </Button>
      </Badge>
    </Tooltip>
  );
}
