import React from "react";
import PropTypes from "prop-types";

const lmUrl = 'http://splitgal4.janelia.org/cgi-bin/view_splitgal4_imagery.cgi?line=<NAME>';
const emUrl = 'https://neuprint.janelia.org/view?bodyid=<NAME>';


export default function ExternalLink({publishedName, isLM}) {
  if (isLM) {
    return <a href={lmUrl.replace(/<NAME>/, publishedName)}>{publishedName}</a>
  }
  return <a href={emUrl.replace(/<NAME>/, publishedName)}>{publishedName}</a>
}

ExternalLink.propTypes = {
  publishedName: PropTypes.string.isRequired,
  isLM: PropTypes.bool
};

ExternalLink.defaultProps = {
  isLM: true
};
