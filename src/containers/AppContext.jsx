import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = (props) => {
  const [state, setState] = useState({
    username: null,
    searchType: 'lines',
    gridView: true,
    showHelp: false,
    resultsPerLine: 1
  });
  const { children } = props;
  return (
    <AppContext.Provider value={[state, setState]}>
        {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export { AppContext, AppProvider };
