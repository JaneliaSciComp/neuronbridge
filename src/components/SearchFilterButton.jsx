import React, { useContext } from "react";
import { Button, Badge } from "antd";
import { faFilter } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deepEqual from "deep-equal";
import { useQuery } from "../libs/hooksLib";
import { AppContext } from "../containers/AppContext";

export default function SearchFilterButton() {
  const query = useQuery();
  const { appState, setAppState } = useContext(AppContext);

  const handleFilterMenuVisability = () => {
    setAppState({
      ...appState,
      showSearchFilters: !appState.showSearchFilters,
    });
  }

  const defaults = {
    saa: [], // selected anatomical areas
  };

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
    <Badge count={count}>
      <Button
        icon={<FontAwesomeIcon icon={faFilter} />}
        onClick={handleFilterMenuVisability}
      >
        Filter
      </Button>
    </Badge>
  );
}
