import * as React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/pro-regular-svg-icons";
import config from "../../config";
import { signedPublicLink, signedLink } from "../../libs/awsLib";

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
  const [signedH5j, setSignedH5j] = React.useState(undefined);
  const [isDisabled, setDisabled] = React.useState(true);
  const ref = window.location;
  const isCustomUpload = Boolean(mask.identityId && mask.alignedVolume);
  const h5j = isCustomUpload
    ? null
    : isLM ? getH5JLink(match.image) : getH5JLink(mask);
  const channel = isCustomUpload
    ? parseInt(mask.channel, 10) || 0
    : isLM
      ? parseInt(match.image.channel, 10)
      : parseInt(mask.channel, 10);
  const { mirrored } = match;

  React.useEffect(() => {
    const swc = isCustomUpload
      ? getSWCLink(match.image)
      : isLM ? getSWCLink(mask) : getSWCLink(match.image);

    if (swc) {
      signedPublicLink(swc).then((signed) => {
        setSignedSwc(signed);
      });
    }

    if (isCustomUpload) {
      const volumePath = `${mask.searchDir}/${mask.alignedVolume}`;
      signedLink(volumePath).then((signed) => {
        setSignedH5j(signed);
        if (swc) {
          setDisabled(false);
        }
      });
    } else if (swc && h5j) {
      setDisabled(false);
    }
  }, [isLM, isCustomUpload, mask, match, h5j]);

  const h5jUrl = isCustomUpload ? signedH5j : h5j;

  // must encode the signedSWC, so that it makes it to the volume viewer in the
  // correct state for loading the swc
  const volViewerLink = `${config.volumeViewer}?ref=${encodeURIComponent(
    ref
  )}&h5j=${encodeURIComponent(h5jUrl)}&swc=${encodeURIComponent(
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
