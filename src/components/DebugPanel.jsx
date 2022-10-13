import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "antd";
import { Auth, API } from "aws-amplify";
import { dataVersionFile } from "../libs/utils";
import "./DebugPanel.css";

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
  }, [publishedNames]);

  const searchEndpoints = config.api.endpoints.map(endpoint => (
    <p key={endpoint.name}>
      <b>{endpoint.name}</b>: {endpoint.endpoint}
    </p>
  ));

  const searchEndpointURL = config.api.endpoints.map(
    endpoint => endpoint.endpoint
  );

  const storesUrls = Object.entries(dataConfig.stores).map(([, store]) => {
    const pppmPathFromConfig = store.prefixes?.CDMSkel.split("/");
    const pppBucketMatch = pppmPathFromConfig ? pppmPathFromConfig.includes(config.PPPM_BUCKET) : false;

    return (
      <>
        <b>{store.label}</b>
        <ul>
          <li><b>Imagery Base URL:</b>{store.prefixes.CDM}</li>
          <li><b>Thumbnail Base URL:</b>{store.prefixes.CDMThumbnail}</li>
          <li><b className={pppBucketMatch ? "" : "noMatch"}>PPP Imagery Base URL:</b>{store.prefixes.CDMSkel}</li>
        </ul>
      </>
    );
  });

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
        <Col span={12} style={{ textAlign: "left" }}>
          <Card size="small" title="Set during website code build">
            <p>
              <b>Data Bucket:</b> {config.s3.BUCKET}
            </p>
            <p>
              <b>Search Bucket:</b> {config.SEARCH_BUCKET}
            </p>
            <p>
              <b> PPPM Bucket:</b>{" "}
              {config.PPPM_BUCKET}
            </p>
            {searchEndpoints}
            <p>
              <b>GraphQL:</b> {config.appsync.graphqlEndpoint}
            </p>
            <p>
              <b>App Level:</b> {config.APP_LEVEL}
            </p>
            <p>
              <b>NODE_ENV:</b> {process.env.NODE_ENV}
            </p>
          </Card>
        </Col>
        <Col span={12} style={{ textAlign: "left" }}>
          <Card
            size="small"
            title={`s3://${config.s3.BUCKET}/${dataVersionFile()}`}
            style={{ marginBottom: "1rem" }}
          >
            <p>
              <b>Data version:</b> {appState.dataVersion}
            </p>
          </Card>
          <Card
            size="small"
            title={`s3://${config.s3.BUCKET}/${appState.dataVersion}/config.json`}
            style={{ marginBottom: "1rem" }}
          >
            {storesUrls}
          </Card>

          <Card size="small" title={`${searchEndpointURL[0]}/published_names`}>
            <p>
              <b>Published Names table:</b> {publishedNames}
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
}

DebugPanel.propTypes = {
  appState: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};
