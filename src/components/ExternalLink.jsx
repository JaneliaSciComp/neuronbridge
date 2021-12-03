import React from "react";
import PropTypes from "prop-types";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const lmUrl =
  "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=<NAME>";
const mcfoUrl =
  "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?slidecode=<NAME>";
// https://neuprint.janelia.org/view?dataset=hemibrain:v1.1&bodyid=12345678
const emUrl =
  process.env.REACT_APP_LEVEL && process.env.REACT_APP_LEVEL.match(/pre$/)
  ? "https://neuprint-pre.janelia.org/view?dataset=<DATASET>&bodyid=<NAME>"
    : "https://neuprint.janelia.org/view?dataset=<DATASET>&bodyid=<NAME>";

const vfbUrl = "http://virtualflybrain.org/xref/neuronbridge/<NAME>";

export default function ExternalLink({ id, isLM, library }) {
  if (isLM) {
    let extUrl = lmUrl;
    let extName = "FlyLight Split-GAL4";

    if (library.match(/gen1.*mcfo/i)) {
      extUrl = mcfoUrl;
      extName = "FlyLight Gen1 MCFO";
    }

    return (
      <>
        <a href={extUrl.replace(/<NAME>/, id)}>
          {extName}{" "}
          <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-10" />
        </a>
        {process.env.REACT_APP_LEVEL &&
        process.env.REACT_APP_LEVEL.match(/pre$/) ? (
          ""
        ) : (
          <>
            <br />
            <a href={vfbUrl.replace(/<NAME>/, id)}>
              Virtual Fly Brain{" "}
              <FontAwesomeIcon
                icon={faExternalLink}
                size="xs"
                transform="up-10"
              />
            </a>
          </>
        )}
      </>
    );
  }

  let dataset = library
    .replace(/flyem_/i, "")
    .toLowerCase()
    .replace("_v", ":v")
    .replace(/\s+/g, "_");

  // TODO: fix the pre-release site dataset since it shouldn't be missing the
  // version number, but the pre-release site doesn't have a version number.
  if (process.env.REACT_APP_LEVEL && process.env.REACT_APP_LEVEL.match(/pre$/)) {
    dataset = dataset.split(':').shift();
  }

  const finalEMUrl = emUrl
    .replace(/<NAME>/, id)
    .replace(/<DATASET>/, dataset);
  return (
    <>
      <a href={finalEMUrl}>
        NeuPrint{" "}
        <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-10" />
      </a>
      {process.env.REACT_APP_LEVEL &&
      process.env.REACT_APP_LEVEL.match(/pre$/) ? (
        ""
      ) : (
        <>
          <br />
          <a href={vfbUrl.replace(/<NAME>/, id)}>
            Virtual Fly Brain{" "}
            <FontAwesomeIcon
              icon={faExternalLink}
              size="xs"
              transform="up-10"
            />
          </a>
        </>
      )}
    </>
  );
}

ExternalLink.propTypes = {
  id: PropTypes.string.isRequired,
  library: PropTypes.string,
  isLM: PropTypes.bool
};

ExternalLink.defaultProps = {
  isLM: true,
  library: "flylight_splitgal4_drivers"
};
