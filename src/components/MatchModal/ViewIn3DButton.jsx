import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/pro-regular-svg-icons";
import config from "../../config";
import { AppContext } from "../../containers/AppContext";
import { signedPublicLink } from "../../libs/awsLib";

function getH5JLink(construct) {
  const imageStack = construct.imageStack || construct.maskImageStack;
  return imageStack;
}

function getSWCLink(baseURL, construct) {
  const filePath = `${baseURL}/${construct.libraryName}/${construct.publishedName}.swc`;
  return <a href={filePath}>{construct.publishedName}.swc</a>;
}

export default function ViewIn3DButton({ isLM, match, mask, style }) {
  const [signedSwc, setSignedSwc] = React.useState(null);
  const { appState } = React.useContext(AppContext);
  const ref = window.location;
  const h5j = isLM ? getH5JLink(match) : getH5JLink(mask);
  const channel = isLM
    ? parseInt(match.channel, 10)
    : parseInt(mask.channel, 10);
  const { mirrored } = match;

  React.useEffect(() => {
    const swc = isLM
      ? getSWCLink(appState.dataConfig.swcBaseURL, mask)
      : getSWCLink(appState.dataConfig.swcBaseURL, match);
    signedPublicLink(swc.props.href).then((signed) => {
      setSignedSwc(signed);
    });
  }, [appState.dataConfig.swcBaseURL, isLM, mask, match]);

  // must encode the signedSWC, so that it makes it to the volume viewer in the
  // correct state for loading the swc
  const volViewerLink = `${config.volumeViewer}?ref=${encodeURIComponent(
    ref
  )}&h5j=${encodeURIComponent(h5j)}&swc=${encodeURIComponent(
    signedSwc
  )}&ch=${channel}&mx=${mirrored}`;

  const handleClick = () => {
    if (config.fathomEventKeys) {
      if (config.fathomEventKeys.viewIn3D) {
        window.fathom.trackGoal(config.fathomEventKeys.viewIn3D, 0);
      }
    }
  };

  return (
    <Button
      href={volViewerLink}
      type="primary"
      ghost
      style={style}
      onClick={handleClick}
      icon={<FontAwesomeIcon icon={faCube} size="lg" transform="left-6" />}
    >
      View in 3D
    </Button>
  );
}

ViewIn3DButton.propTypes = {
  isLM: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  mask: PropTypes.object.isRequired,
  style: PropTypes.object,
};

ViewIn3DButton.defaultProps = {
  style: {},
};
