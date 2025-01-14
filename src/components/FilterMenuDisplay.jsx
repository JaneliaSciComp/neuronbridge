import React, { useContext } from "react";
import PropTypes from "prop-types";
import FilterMenu from "./FilterMenu";
import { AppContext } from "../containers/AppContext";

export default function FilterMenuDisplay({
  showLineNameFilter=false,
  searchAlgorithm,
  countsByLibrary,
  useGenderFilter,
}) {
  const { appState } = useContext(AppContext);

  if (!appState.showFilterMenu) {
    return null;
  }
  return (
    <FilterMenu
      searchAlgorithm={searchAlgorithm}
      showLineNameFilter={showLineNameFilter}
      countsByLibrary={countsByLibrary}
      useGenderFilter={useGenderFilter}
    />
  );
}

FilterMenuDisplay.propTypes = {
  showLineNameFilter: PropTypes.bool,
  countsByLibrary: PropTypes.object.isRequired,
  useGenderFilter: PropTypes.bool.isRequired,
  searchAlgorithm: PropTypes.string.isRequired,
};
