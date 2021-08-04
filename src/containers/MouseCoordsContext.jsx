import React from "react";
import PropTypes from "prop-types";

const MouseCoordsContext = React.createContext();

function coordsReducer(state, action) {
  switch (action.type) {
    case "update": {
      return { ...state, position: action.payload };
    }
    case "clear": {
      return { ...state, position: [0,0] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CoordsProvider({ children }) {
  const [state, dispatch] = React.useReducer(coordsReducer, { position: [0,0] });
  const value = { state, dispatch };
  return (
    <MouseCoordsContext.Provider value={value}>{children}</MouseCoordsContext.Provider>
  );
}


CoordsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

function useCoords() {
  const context = React.useContext(MouseCoordsContext);
  if (context === undefined) {
    throw new Error("useCoords must be used within a CoordsProvider");
  }
  return context;
}

export { CoordsProvider, useCoords };
