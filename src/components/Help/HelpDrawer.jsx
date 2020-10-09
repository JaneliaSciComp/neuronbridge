import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import { AppContext } from "../../containers/AppContext";

export default function HelpDrawer({ children }) {
  const [appState, setAppState] = useContext(AppContext);

  function handleClose() {
    setAppState({ ...appState, showHelp: false });
  }

  return (
    <Drawer
      title={<Link to="/help" onClick={handleClose}>Help</Link>}
      placement="bottom"
      height={400}
      onClose={handleClose}
      visible={appState.showHelp}
      mask={false}
    >
      {children}
    </Drawer>
  );
}

HelpDrawer.propTypes = {
  children: PropTypes.object.isRequired
};
