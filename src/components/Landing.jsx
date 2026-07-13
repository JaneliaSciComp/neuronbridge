// Landing.jsx
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Col, Row } from "antd";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "./SearchInput";
import { AppContext } from "../containers/AppContext";
import { isInternalSite, dataVersionFile } from "../libs/utils";
import config from "../config";
import "./Landing.css";

const { Title, Paragraph } = Typography;

// Fallback list used if collections.json cannot be loaded, so the home page
// never renders an empty collections section. Kept in sync with the data file.
const FALLBACK_COLLECTIONS = [
  { name: "FlyLight Generation 1 MCFO", type: "Light Microscopy", homepageUrl: "http://gen1mcfo.janelia.org/cgi-bin/gen1mcfo.cgi" },
  { name: "FlyLight Split-GAL4", type: "Light Microscopy", homepageUrl: "http://splitgal4.janelia.org" },
  { name: "FlyLight Split-GAL4 Omnibus Broad", type: "Light Microscopy", homepageUrl: "https://flylight-raw.janelia.org/cgi-bin/raw.cgi" },
  { name: "FlyEM Male CNS", type: "Electron Microscopy", homepageUrl: "https://neuprint.janelia.org/?dataset=male-cns:v0.9&qt=findneurons" },
  { name: "FlyEM Hemibrain", type: "Electron Microscopy", homepageUrl: "https://neuprint.janelia.org/?dataset=hemibrain%3Av1.2.1&qt=findneurons" },
  { name: "FlyEM MANC", type: "Electron Microscopy", homepageUrl: "https://neuprint.janelia.org/?dataset=manc%3Av1.0&qt=findneurons" },
  { name: "FlyWire Brain", type: "Electron Microscopy", homepageUrl: "https://codex.flywire.ai?dataset=fafb" },
  { name: "FlyWire BANC", type: "Electron Microscopy", homepageUrl: "https://codex.flywire.ai/?dataset=banc" },
];

function Landing(props) {
  const { isAuthenticated } = props;
  const { appState } = useContext(AppContext);
  const [collections, setCollections] = useState(null);

  // Load the collection list from collections.json in the data bucket. The
  // landing page is public and loads before authentication, so we fetch the
  // file directly over https rather than through authenticated Storage.
  useEffect(() => {
    let cancelled = false;

    async function loadCollections() {
      try {
        let version = appState?.dataVersion;
        if (!version) {
          const versionResponse = await fetch(
            `https://s3.amazonaws.com/${config.s3.BUCKET}/${dataVersionFile()}`,
          );
          if (versionResponse.ok) {
            version = (await versionResponse.text()).trim();
          }
        }
        // In development the mock service worker intercepts collections.json
        // regardless of the version segment, so a placeholder is acceptable.
        const versionSegment = version || "current";
        const response = await fetch(
          `https://s3.amazonaws.com/${config.s3.BUCKET}/${versionSegment}/collections.json`,
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (!cancelled && data && Array.isArray(data.collections)) {
          setCollections(data.collections);
        }
      } catch (err) {
        // Leave collections null so the fallback list is shown.
      }
    }

    loadCollections();
    return () => {
      cancelled = true;
    };
  }, [appState?.dataVersion]);

  // Group the collections by type (e.g. Light Microscopy / Electron
  // Microscopy), preserving the order they appear in the data.
  const collectionsToShow = collections || FALLBACK_COLLECTIONS;
  const collectionGroups = [];
  collectionsToShow.forEach((collection) => {
    const groupLabel = collection.type || "Data Collections";
    let group = collectionGroups.find((entry) => entry.label === groupLabel);
    if (!group) {
      group = { label: groupLabel, items: [] };
      collectionGroups.push(group);
    }
    group.items.push(collection);
  });

  const loginText = isInternalSite() ? (
    <>
      Please <Link to="/login">login with Okta</Link> to start searching.
    </>
  ) : (
    <>
      Please <Link to="/login">login</Link> or <Link to="signup">sign up</Link>{" "}
      to start searching.
    </>
  );

  return (
    <>
      {isAuthenticated && <SearchInput />}
      <div className="landing">
        <Title>
          {isInternalSite()
            ? "NeuronBridge (pre-release)"
            : "Welcome to NeuronBridge"}
        </Title>
        <Row>
          <Col md={12} className="copy">
            {!isAuthenticated && <Paragraph strong>{loginText}</Paragraph>}
            <Paragraph>Find your neuron fast!</Paragraph>

            <Paragraph>
              Search light and electron microscopy data sets of the Drosophila
              nervous system provided by the{" "}
              <a href="https://www.janelia.org/project-team/flylight" target="_blank" rel="noopener noreferrer">
                FlyLight <FontAwesomeIcon icon={faExternalLink} size="xs" />
              </a>{" "}
              and <a href="https://www.janelia.org/project-team/flyem" target="_blank" rel="noopener noreferrer">FlyEM <FontAwesomeIcon icon={faExternalLink} size="xs" /></a>{" "}
              projects at{" "}
              <a href="https://www.janelia.org" target="_blank" rel="noopener noreferrer">Janelia Research Campus <FontAwesomeIcon icon={faExternalLink} size="xs" /></a>, as well
              as other public connectomic data sets.
              You can find similar neurons based on shape regardless of data set.
            </Paragraph>

            {!isAuthenticated && (
              <Paragraph>
                Please login above if you already know your neuron ID or driver
                line name, or start by browsing the included data collections:
              </Paragraph>
            )}
            {isAuthenticated && (
              <Paragraph>
                Begin your search above if you already know your neuron ID or
                driver line name, or start by browsing the included <Link to="/collections">data collections</Link>:
              </Paragraph>
            )}

            <Row className="collections">
              {collectionGroups.map((group) => (
                <Col span={12} key={group.label}>
                  <b>{group.label}</b><br/>
                  {group.items.map((collection) =>
                    collection.homepageUrl ? (
                      <React.Fragment key={collection.name}>
                        <a href={collection.homepageUrl} target="_blank" rel="noopener noreferrer">{collection.name} <FontAwesomeIcon icon={faExternalLink} size="xs" /></a><br/>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={collection.name}>
                        <Link to="/collections">{collection.name}</Link><br/>
                      </React.Fragment>
                    ),
                  )}
                </Col>
              ))}
            </Row>

            <Paragraph>
              We offer instant results with Color Depth MIP and PatchPerPixMatch
              search algorithms across image collections. You can also
              upload your own image to run a custom Color Depth MIP search (see About
              page). For NBLAST searching, try{" "}
              <a href="https://www.virtualflybrain.org" target="_blank" rel="noopener noreferrer">Virtual Fly Brain <FontAwesomeIcon icon={faExternalLink} size="xs" /></a>.
            </Paragraph>

            <Paragraph>
              <Link to="/about">Learn more…</Link>
            </Paragraph>
          </Col>
        </Row>
      </div>
    </>
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Landing;
