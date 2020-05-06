import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { QuestionOutlined } from "@ant-design/icons";
import { AppContext } from "../containers/AppContext";

export default function HelpButton({target}) {
  const [appState, setAppState] = useContext(AppContext);

  function handleHelp() {
    setAppState({ ...appState, showHelp: true, helpTarget: target });
  }
  return (
    <Button
      size="small"
      shape="circle"
      icon={<QuestionOutlined />}
      onClick={handleHelp}
    />
  );
}

HelpButton.propTypes = {
  target: PropTypes.string.isRequired
};
