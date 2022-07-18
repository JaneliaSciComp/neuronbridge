import React, { useContext } from "react";
import PropTypes from "prop-types";
import FilterMenu from "./FilterMenu";
import { AppContext } from "../containers/AppContext";

export default function FilterMenuDisplay({
  searchType,
  countsByLibrary,
  useGenderFilter,
}) {
  const { appState } = useContext(AppContext);

  if (!appState.showFilterMenu) {
    return null;
  }
  return (
    <FilterMenu
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
};

FilterMenuDisplay.defaultProps = {
  searchType: "lines",
};
