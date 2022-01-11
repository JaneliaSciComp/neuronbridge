import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { Auth, API } from "aws-amplify";

export default function DebugPanel({ appState, config }) {
  const [publishedNames, setPublishedNames] = useState();
  const { dataConfig } = appState;

  useEffect(() => {
    Auth.currentCredentials().then(() => {
        API.get("SearchAPI", "/published_names", {
          queryStringParameters: { version: true }
        }).then(data => {
          setPublishedNames(data.version);
        });
    });
  },[publishedNames]);

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
          <b>Data version:</b> {appState.dataVersion}
        </p>
        <p>
          <b>Imagery Base URL:</b> {dataConfig.imageryBaseURL}
        </p>
        <p>
          <b>Thumbnails Base URL:</b> {dataConfig.thumbnailsBaseURLs}
        </p>
        <p>
          <b>PPP Imagery Base URL:</b> {dataConfig.pppImageryBaseURL}
        </p>
        <p>
          <b>NODE_ENV:</b> {process.env.NODE_ENV}
        </p>
        <p>
          <b>Published Names table:</b> {publishedNames}
        </p>
      </Col>
    </Row>
    </>
  );
}

DebugPanel.propTypes = {
  appState: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};
