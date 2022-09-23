import React, { useContext } from "react";
import PropTypes from "prop-types";
import FilterMenu from "./FilterMenu";
import { AppContext } from "../containers/AppContext";

export default function FilterMenuDisplay({
  searchType,
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
      searchType={searchType}
      countsByLibrary={countsByLibrary}
      useGenderFilter={useGenderFilter}
    />
  );
}

FilterMenuDisplay.propTypes = {
  searchType: PropTypes.string,
  countsByLibrary: PropTypes.object.isRequired,
  useGenderFilter: PropTypes.bool.isRequired,
  searchAlgorithm: PropTypes.string.isRequired,
};

FilterMenuDisplay.defaultProps = {
  searchType: "lines",
};
