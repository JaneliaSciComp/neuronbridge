import React from "react";
import PropTypes from "prop-types";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const lmUrl =
  "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?slidecode=<NAME>";
const mcfoUrl =
  "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?slidecode=<NAME>";
// https://neuprint.janelia.org/view?dataset=hemibrain:v1.1&bodyid=12345678

function VFBLink({ name }) {
  const vfbUrl = "http://virtualflybrain.org/xref/neuronbridge/<NAME>";

  return (
    <a href={vfbUrl.replace(/<NAME>/, name)}>
      Virtual Fly Brain{" "}
      <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-2" />
    </a>
  );
}

VFBLink.propTypes = {
  name: PropTypes.string.isRequired,
};

function FlyWireLink({ tag }) {
  const [, version, id] = tag.split(":");

  const flyWireUrl =
    "https://codex.flywire.ai/app/cell_details?data_version=<VERSION>&root_id=<ID>";

  return (
    <a
      href={flyWireUrl
        .replace(/<ID>/, id)
        .replace(/<VERSION>/, version.replace(/^v/, ""))}
    >
      FlyWire{" "}
      <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-2" />
    </a>
  );
}

FlyWireLink.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default function ExternalLink({ id, isLM, library, publishedName }) {
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
          <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-2" />
        </a>
        {process.env.REACT_APP_LEVEL &&
        process.env.REACT_APP_LEVEL.match(/pre$/) ? (
          ""
        ) : (
          <>
            <br />
            <VFBLink name={publishedName} />
          </>
        )}
      </>
    );
  }

  // is an EM library
  let dataset = library
    .replace(/flyem_/i, "")
    .toLowerCase()
    .replace("_v", ":v")
    .replace(/\s+/g, "_");

  // TODO: fix the pre-release site dataset since it shouldn't be missing the
  // version number, but the pre-release site doesn't have a version number.
  // Also, the pre-release data on neuprint was called vnc and not manc, so the
  // dataset name needs to be converted as well.
  if (
    process.env.REACT_APP_LEVEL &&
    process.env.REACT_APP_LEVEL.match(/pre$/)
  ) {
    dataset = dataset.split(":").shift();
    if (dataset === "manc") {
      dataset = "vnc";
    }
  }

  const emUrl =
    process.env.REACT_APP_LEVEL && process.env.REACT_APP_LEVEL.match(/pre$/)
      ? "https://neuprint-pre.janelia.org/view?dataset=<DATASET>&bodyid=<NAME>"
      : "https://neuprint.janelia.org/view?dataset=<DATASET>&bodyid=<NAME>";

  const finalEMUrl = emUrl
    .replace(/<NAME>/, id.split(":").slice(-1))
    .replace(/<DATASET>/, dataset);

  const secondaryLink = library.match(/flywire_fafb/i) ? (
    <FlyWireLink tag={id} />
  ) : (
    <VFBLink name={id} />
  );

  return (
    <>
      { !library.match(/flywire_fafb/i) ? (
        <>
      <a href={finalEMUrl}>
        NeuPrint{" "}
        <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-2" />
        </a><br /></>) : ""}
      {process.env.REACT_APP_LEVEL &&
      process.env.REACT_APP_LEVEL.match(/pre$/) ? (
        ""
      ) : (
        secondaryLink
      )}
    </>
  );
}

ExternalLink.propTypes = {
  id: PropTypes.string.isRequired,
  publishedName: PropTypes.string,
  library: PropTypes.string,
  isLM: PropTypes.bool,
};

ExternalLink.defaultProps = {
  isLM: true,
  publishedName: "",
  library: "flylight_splitgal4_drivers",
};
