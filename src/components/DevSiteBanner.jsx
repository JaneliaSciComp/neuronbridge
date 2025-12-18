import "./DevSiteBanner.css";
import { useContext } from "react";
import { Switch } from "antd";
import { AppContext } from "../containers/AppContext";

export default function DevSiteBanner() {
  const { appState, setPermanent } = useContext(AppContext);

  const handleShowDebug = () => {
    setPermanent({ debug: !appState.debug });
  };

  return (
    <div className="devsite-banner">
      <p>
        This is the development server. For the public release, please go to{" "}
        <a href="https://neuronbridge.janelia.org" target="_blank" rel="noopener noreferrer">prod</a> | {" "}
        { appState.isAdmin ? (
        <Switch
          checked={appState.debug}
          onChange={handleShowDebug}
          checkedChildren="debug enabled"
          unCheckedChildren="debug disabled"
          defaultChecked
        />
        ) : null }
      </p>
    </div>
  );
}
