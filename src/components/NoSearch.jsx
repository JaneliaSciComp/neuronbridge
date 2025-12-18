import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider } from "antd";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HelpButton from "./Help/HelpButton";

const { Title, Paragraph } = Typography;

export default function NoSearch({ filters }) {
  return (
    <div>
      {filters ? (
        <Paragraph>Your filters may be limiting the results you can see.</Paragraph>
      ) : (
        ""
      )}
      <Divider />
      <Title level={3}>Not sure what to search for?</Title>
      <Paragraph>
        You can search for line names on the{" "}
        <a href="http://splitgal4.janelia.org" target="_blank" rel="noopener noreferrer">Split-GAL4 <FontAwesomeIcon icon={faExternalLink} size="xs" /></a> or{" "}
        <a href="http://gen1mcfo.janelia.org/cgi-bin/gen1mcfo.cgi" target="_blank" rel="noopener noreferrer">
          Generation 1 MCFO <FontAwesomeIcon icon={faExternalLink} size="xs" />
        </a>{" "}
        websites.
      </Paragraph>
      <Paragraph>
        Explore neurons on the{" "}
        <a href="https://neuprint.janelia.org" target="_blank" rel="noopener noreferrer">neuPrint <FontAwesomeIcon icon={faExternalLink} size="xs" /></a> website.
      </Paragraph>
      <Title level={3}>Search Help</Title>
      <p>
        Not sure how to search? Have a look at the{" "}
        <HelpButton target="SearchInput" text="help documentation" />
      </p>
    </div>
  );
}

NoSearch.propTypes = {
  filters: PropTypes.bool
};

NoSearch.defaultProps = {
  filters: false
};
