import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext([{}, () => {}]);

const initialState = {
  username: null,
  searchType: 'lines',
  gridView: true,
  showHelp: false,
  helpTarget: null,
  showFilterMenu: false,
  showAlignmentMeta: false,
  paths: {},
  debug: false
}

const localState = JSON.parse(localStorage.getItem("appState"));

const combinedState = {...initialState, ...localState};

const AppProvider = ({children}) => {
  const [state, setState] = useState(combinedState);

  const setPermanent = (action) => {
    const updatedState = { ...localState, ...action};
    localStorage.setItem("appState", JSON.stringify(updatedState));
    setState({ ...state, ...action });
  }

  return (
    <AppContext.Provider value={[state, setState, setPermanent]}>
        {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export { AppContext, AppProvider };
