import React from "react";
import PropTypes from "prop-types";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const lmUrl =
  "http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?line=<NAME>";
const mcfoUrl = "http://gen1mcfo.janelia.org/cgi-bin/view_gen1mcfo_imagery.cgi?line=<NAME>";
const emUrl = "https://neuprint.janelia.org/view?bodyid=<NAME>";

export default function ExternalLink({ publishedName, isLM, library }) {
  if (isLM) {
    let extUrl = lmUrl
    switch(library) {
      case 'flylight_gen1_mcfo_case_1':
        extUrl = mcfoUrl;
        break;
      default:
        extUrl = lmUrl;
    }

    return (
      <a href={extUrl.replace(/<NAME>/, publishedName)}>
        {publishedName} <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-10" />
      </a>
    );
  }
  return (
    <a href={emUrl.replace(/<NAME>/, publishedName)}>
      {publishedName} <FontAwesomeIcon icon={faExternalLink} size="xs" transform="up-10" />
    </a>
  );
}

ExternalLink.propTypes = {
  publishedName: PropTypes.string.isRequired,
  library: PropTypes.string,
  isLM: PropTypes.bool
};

ExternalLink.defaultProps = {
  isLM: true,
  library: "flylight_splitgal4_drivers"
};
