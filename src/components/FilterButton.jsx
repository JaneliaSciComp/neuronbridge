import React, { useContext } from "react";
import {
  Button,
  Badge,
  Tooltip } from "antd";
import deepEqual from "deep-equal";
import { FilterOutlined } from "@ant-design/icons";
import { AppContext } from "../containers/AppContext";
import { FilterContext } from "../containers/FilterContext";

export default function FilterButton() {

  const [appState, setAppState] = useContext(AppContext);
  const [filterState] = useContext(FilterContext);

  function handleFilterMenuVisability() {
    setAppState({ ...appState, showFilterMenu: !appState.showFilterMenu });
  }

  // Work out how many filters have been applied by checking the
  // differences between the keys in the filter state, vs the keys
  // in the default of the state.

  const { defaults, ...setFilters } = filterState;

  const count = Object.entries(setFilters).reduce((acc, filter) => {
    if(!(filter[0] in defaults)) {
      throw Error(`You forgot to set a default for filter: ${filter[0]} in FilterContext.jsx`);
    }
    // if the default matches the current filter return acc unchanged
    if (deepEqual(defaults[filter[0]], filter[1])) {
      return acc;
    }
    // If we get here a filter has been applied, so add 1 to total,
    return acc + 1;
  },0);


  return (
    <Tooltip title="filter results">
      <Badge count={count}>
        <Button icon={<FilterOutlined />} onClick={handleFilterMenuVisability}>
          Filters
        </Button>
      </Badge>
    </Tooltip>
  );
}
