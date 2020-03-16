import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Modal, Button, Divider, Row, Col } from "antd";
import LineSummary from "./LineSummary";
import MatchSummary from "./MatchSummary";
import config from "../config";

export default function Matches(props) {
  const { searchResult } = props;
  const { results } = searchResult;
  const { matchId } = useParams();
  const [matchMeta, setMatchMeta] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);
  const [maskOpen, setMaskOpen] = useState(true);

  const matchInput = results.filter(result => result.id === matchId)[0];
  useEffect(() => {
    function getMatches() {
      const path = `${config.MATCH_PATH}${matchId}.json`;
      fetch(path)
        .then(response => response.json())
        .then(json => setMatchMeta(json))
        .catch(error => console.log(error));
    }

    getMatches();
  }, [matchId, searchResult]);

  let matchesList = <p>Loading...</p>;
  let selectedMatch = {};

  if (matchMeta) {
    matchesList = matchMeta.results
      .sort((a, b) => {
        return b.attrs.Score - a.attrs.Score;
      })
      .map((result, index) => {
        return (
          <MatchSummary
            match={result}
            key={result.matchedId}
            showModal={() => setModalOpen(index + 1)}
          />
        );
      });
    selectedMatch = matchMeta.results[modalOpen - 1];
  }

  return (
    <div>
      <LineSummary lineMeta={matchInput} />
      <Divider />
      <h3>
        Matches 1 - {matchesList.length} of {matchesList.length}
      </h3>
      {matchesList}
      <Modal
        visible={Boolean(modalOpen)}
        onCancel={() => setModalOpen(null)}
        footer={[
          <Button
            key="mask"
            type="primary"
            onClick={() => setMaskOpen(!maskOpen)}
          >
            {maskOpen ? "Hide Mask" : "Show Mask"}
          </Button>,
          <Button key="back" type="primary" onClick={() => setModalOpen(null)}>
            Done
          </Button>
        ]}
        width="90%"
      >
        <Row>
          {maskOpen && (
            <Col span={12}>
              <p>Mask</p>
              <img src={matchInput.image_path} alt="Mask for search" />
            </Col>
          )}
          <Col span={maskOpen ? 12 : 24}>
            <p>Match</p>
            <img
              src={selectedMatch && selectedMatch.image_path}
              alt="Search Match"
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

Matches.propTypes = {
  searchResult: PropTypes.object.isRequired
};
