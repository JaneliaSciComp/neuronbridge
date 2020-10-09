import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { AppContext } from "../../containers/AppContext";

export default function HelpButton({target, text}) {
  const [appState, setAppState] = useContext(AppContext);

  function handleHelp() {
    setAppState({ ...appState, showHelp: true, helpTarget: target });
  }

  if (text) {
    return (
      <Button type="link" style={{'padding': '0'}} onClick={handleHelp}>{text}</Button>
    );
  }

  return (
    <Button
      size="small"
      shape="circle"
      icon='?'
      onClick={handleHelp}
   />
  );
}

HelpButton.propTypes = {
  target: PropTypes.string.isRequired,
  text: PropTypes.string
};

HelpButton.defaultProps = {
  text: null
};
