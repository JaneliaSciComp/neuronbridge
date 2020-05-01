import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import { AppContext } from "../containers/AppContext";

export default function HelpDrawer({ children }) {
  const [appState, setAppState] = useContext(AppContext);

  function handleClose() {
    setAppState({ ...appState, showHelp: false });
  }

  return (
    <Drawer
      title="Help"
      placement="bottom"
      onClose={handleClose}
      visible={appState.showHelp}
      mask={false}
    >
      {children}
    </Drawer>
  );
}

HelpDrawer.propTypes = {
  children: PropTypes.elementType.isRequired
};
