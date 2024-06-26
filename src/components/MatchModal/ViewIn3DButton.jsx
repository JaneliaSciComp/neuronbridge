import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/pro-regular-svg-icons";
import config from "../../config";
import { signedPublicLink } from "../../libs/awsLib";

function getH5JLink(construct) {
  const imageStack = construct?.files?.VisuallyLosslessStack;
  return imageStack;
}

function getSWCLink(construct) {
  const filePath = construct?.files?.AlignedBodySWC;
  return filePath;
}

export default function ViewIn3DButton({ isLM, match, mask, style }) {
  const [signedSwc, setSignedSwc] = React.useState(undefined);
  const [isDisabled, setDisabled] = React.useState(true);
  const ref = window.location;
  const h5j = isLM ? getH5JLink(match.image) : getH5JLink(mask);
  const channel = isLM
    ? parseInt(match.image.channel, 10)
    : parseInt(mask.channel, 10);
  const { mirrored } = match;

  React.useEffect(() => {
    const swc = isLM ? getSWCLink(mask) : getSWCLink(match.image);
    signedPublicLink(swc).then((signed) => {
      setSignedSwc(signed);
    });

    if (swc && h5j) {
      setDisabled(false);
    }
  }, [isLM, mask, match, h5j]);

  // must encode the signedSWC, so that it makes it to the volume viewer in the
  // correct state for loading the swc
  const volViewerLink = `${config.volumeViewer}?ref=${encodeURIComponent(
    ref
  )}&h5j=${encodeURIComponent(h5j)}&swc=${encodeURIComponent(
    signedSwc
  )}&ch=${channel}&mx=${mirrored}`;

  const handleClick = () => {
    if (config.fathomEventKeys && Object.prototype.hasOwnProperty.call(window, 'fathom')) {
      if (config.fathomEventKeys.viewIn3D) {
        if (window.fathom) {
          window.fathom.trackGoal(config.fathomEventKeys.viewIn3D, 0);
        }
      }
    }
  };

  return (
    <Button
      href={volViewerLink}
      type="primary"
      ghost
      style={style}
      disabled={isDisabled}
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
