import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext([{}, () => {}]);

const initialState = {
  username: null,
  isAdmin: false,
  searchType: 'lines',
  gridView: true,
  showHelp: false,
  helpTarget: null,
  showFilterMenu: false,
  showAlignmentMeta: false,
  imageChoices: {
    ppp: {},
    cdm: {}
  },
  comparisonCount: {
    ppp: 2,
    cdm: 2
  },
  dataConfig: {},
  dataVersion: null,
  migrationMessage: true,
  debug: false,
  closedAnnouncements: []
}

const localState = JSON.parse(localStorage.getItem("appState"));

const combinedState = {...initialState, ...localState};

const AppProvider = ({children}) => {
  const [appState, setAppState] = useState(combinedState);

  const setState = (payload) => {
    setAppState({ ...appState, ...payload});
  }

  const setPermanent = (action) => {
    const updatedState = { ...localState, ...action};
    localStorage.setItem("appState", JSON.stringify(updatedState));
    setAppState({ ...appState, ...action });
  }

  const resetPermanent = () => {
    localStorage.setItem("appState", JSON.stringify({}));
  }

  // TODO: convert the value returned from an [] to an {}.
  return (
    <AppContext.Provider value={{appState, setState, setAppState, setPermanent, resetPermanent}}>
        {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export { AppContext, AppProvider };
