import React, { useContext } from "react";
import PropTypes from "prop-types";
import FilterMenu from "./FilterMenu";
import { AppContext } from "../containers/AppContext";

export default function FilterMenuDisplay({ searchType, countsByLibrary }) {
  const [appState] = useContext(AppContext);

  if (!appState.showFilterMenu) {
    return null;
  }
  return (<FilterMenu searchType={searchType} countsByLibrary={countsByLibrary} />);
}

FilterMenuDisplay.propTypes = {
  searchType: PropTypes.string,
  countsByLibrary: PropTypes.object.isRequired
};

FilterMenuDisplay.defaultProps = {
  searchType: "lines"
};
