import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

export default function DebugPanel({ paths, config }) {

  const searchEndpoints = config.api.endpoints.map(endpoint => (
    <p key={endpoint.name}>
      <b>{endpoint.name}</b>: {endpoint.endpoint}
    </p>
  ));

  return (
    <>
    <Row gutter={8}>
      <Col span={12} style={{ textAlign: "left" }}>
        <p>
          <b>Data Bucket:</b> {config.s3.BUCKET}
        </p>
        <p>
          <b>Search Bucket:</b> {config.SEARCH_BUCKET}
        </p>
        <p>
          <b>PPPM Bucket:</b> {config.PPPM_BUCKET}
        </p>
        {searchEndpoints}
        <p>
          <b>GraphQL:</b> {config.appsync.graphqlEndpoint}
        </p>
        <p>
          <b>App Level:</b> {config.APP_LEVEL}
        </p>
      </Col>
      <Col span={12} style={{ textAlign: "left" }}>
        <p>
          <b>Imagery Base URL:</b> {paths.imageryBaseURL}
        </p>
        <p>
          <b>Thumbnails Base URL:</b> {paths.thumbnailsBaseURLs}
        </p>
        <p>
          <b>PPP Imagery Base URL:</b> {paths.pppImageryBaseURL}
        </p>
        <p>
          <b>Precomputed Data Root:</b> {paths.precomputedDataRootPath}
        </p>
      </Col>
    </Row>
    </>
  );
}

DebugPanel.propTypes = {
  paths: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};
