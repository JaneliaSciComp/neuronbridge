import React, { useState } from "react";
import PropTypes from "prop-types";

const FilterContext = React.createContext([{}, () => {}]);

const FilterProvider = (props) => {
  const [state, setState] = useState({
    // make sure you put in the default values in the defaults key
    // these are used to determine if filters have been applied by
    // the client.
    defaults: {
      resultsPerLine: 1,
      sortResultsBy: 1,
      filteredLibraries: {},
    },
    sortResultsBy: 1,
    resultsPerLine: 1,
    filteredLibraries: {},
  });
  const { children } = props;
  return (
    <FilterContext.Provider value={[state, setState]}>
        {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export { FilterContext, FilterProvider };
