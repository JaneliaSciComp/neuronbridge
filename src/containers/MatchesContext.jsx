import React from "react";
import PropTypes from "prop-types";

const MatchesContext = React.createContext();

function matchesReducer(state, action) {
  switch (action.type) {
    case "add": {
      const updated = [...state.selected, action.payload];
      return { ...state, selected: updated };
    }
    case "remove": {
      const updated = state.selected.filter(item => item !== action.payload);
      return { ...state, selected: updated };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MatchesProvider({ children }) {
  const [state, dispatch] = React.useReducer(matchesReducer, { selected: [] });
  const value = { state, dispatch };
  return (
    <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>
  );
}

MatchesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

function useMatches() {
  const context = React.useContext(MatchesContext);
  if (context === undefined) {
    throw new Error("useMatches must be used within a MatchesProvider");
  }
  return context;
}

export { MatchesProvider, useMatches };
