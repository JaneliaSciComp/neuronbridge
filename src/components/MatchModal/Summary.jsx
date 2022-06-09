import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Divider, Button } from "antd";
import ImageComparison from "./ImageComparison";
import DownloadZipCheckbox from "./DownloadZipCheckbox";
import InputMeta from "./InputMeta";
import MatchMeta from "./MatchMeta";
import ViewIn3DButton from "./ViewIn3DButton";
import { AppContext } from "../../containers/AppContext";

export default function Summary(props) {
  const { selectedMatch, mask, isLM, selected, matchesList } = props;
  const { appState, setPermanent } = useContext(AppContext);

  function handleDetailsToggle() {
    setPermanent({ compactMeta: !appState.compactMeta });
  }

  return (
    <>
      <Row gutter={16}>
        <Col sm={12}>
          <InputMeta mask={mask} isLM={isLM} compact={appState.compactMeta} />
        </Col>
        <Col sm={12}>
          <DownloadZipCheckbox matchId={selectedMatch.id} />
          <MatchMeta
            match={selectedMatch}
            isLM={isLM}
            matchesList={matchesList}
            compact={appState.compactMeta}
            matchRank={selected}
          />
        </Col>
      </Row>
      <Divider />
      <ImageComparison
        isLM={isLM}
        mask={mask}
        match={selectedMatch}
        matchPath={selectedMatch.imageURL}
        matchThumbnail={selectedMatch.thumbnailURL}
      >
        <Button
          type="button"
          onClick={handleDetailsToggle}
          style={{ float: "right" }}
        >
          {appState.compactMeta ? "Show" : "Hide"} Match Info
        </Button>
        <ViewIn3DButton
          style={{ float: "right", marginRight: "0.5em" }}
          isLM={isLM}
          mask={mask}
          match={selectedMatch}
        />
      </ImageComparison>
    </>
  );
}

Summary.propTypes = {
  matchesList: PropTypes.arrayOf(PropTypes.object),
  isLM: PropTypes.bool.isRequired,
  selectedMatch: PropTypes.object.isRequired,
  mask: PropTypes.object,
  selected: PropTypes.number.isRequired,
};

Summary.defaultProps = {
  matchesList: [],
  mask: {},
};
