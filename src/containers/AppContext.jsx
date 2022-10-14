import React, { useState } from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext([{}, () => {}]);

const initialState = {
  username: null,
  isAdmin: false,
  searchType: "LMImage",
  gridView: true,
  showHelp: false,
  helpTarget: null,
  showFilterMenu: false,
  showAlignmentMeta: false,
  imageChoices: {
    pppm: {},
    cdm: {}
  },
  comparisonCount: {
    pppm: 2,
    cdm: 2
  },
  // dataConfig is overwritten by the config,json file loaded in
  // App.jsx. These values are placeholders.
  dataConfig: {
    // these are the regions that are available in the search upload form.
    // example region component:
    // {
    //   label: String: <value displayed in the form>,
    //   value: String: <value sent to API>,
    //   disabled: Boolean: <default is false>
    // }
    // Order is important. The first value in the list will be the default value that
    // the site selects
    anatomicalAreas: {
      Brain : {
        label: "Brain",
        alignmentSpace: "JRC2018_Unisex_20x_HR"
      },
    },
    stores: {},
    disableAlignment: false
  },
  dataVersion: null,
  migrationMessage: true,
  debug: false,
  closedAnnouncements: []
};

const localState = JSON.parse(localStorage.getItem("appState"));

const combinedState = { ...initialState, ...localState };

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState(combinedState);

  const setState = payload => {
    setAppState({ ...appState, ...payload });
  };

  const setPermanent = action => {
    const updatedState = { ...localState, ...action };
    localStorage.setItem("appState", JSON.stringify(updatedState));
    setAppState({ ...appState, ...action });
  };

  const resetPermanent = () => {
    localStorage.setItem("appState", JSON.stringify({}));
  };

  return (
    <AppContext.Provider
      value={{ appState, setState, setAppState, setPermanent, resetPermanent }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.object.isRequired
};

export { AppContext, AppProvider };
