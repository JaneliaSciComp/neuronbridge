import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col, Button, Card } from "antd";
import ImageComparison from "./ImageComparison";
import DownloadZipCheckbox from "./DownloadZipCheckbox";
import InputMeta from "./InputMeta";
import MatchMeta from "./MatchMeta";
import ViewIn3DButton from "./ViewIn3DButton";
import { AppContext } from "../../containers/AppContext";

export default function Summary(props) {
  const { selectedMatch, mask, isLM, selected, matchesList } = props;
  const { algorithm } = useParams();
  const { appState, setPermanent } = useContext(AppContext);

  const handleDetailsToggle = () => {
    setPermanent({ compactMeta: !appState.compactMeta });
  }

  return (
    <>
      <Row gutter={[16, 16]} style={{marginBottom: "1rem"}}>
        <Col sm={12}>
          <Card style={{height: "100%"}}>
            <InputMeta
              mask={{ image: mask }}
              isLM={isLM}
              compact={appState.compactMeta}
            />
          </Card>
        </Col>
        <Col sm={12}>
          <Card style={{height: "100%"}}>
            <DownloadZipCheckbox matchId={selectedMatch.image.id} />
            <MatchMeta
              match={selectedMatch}
              isLM={isLM}
              matchesList={matchesList}
              compact={appState.compactMeta}
              matchRank={selected}
            />
          </Card>
        </Col>
      </Row>
      <ImageComparison
        isLM={isLM}
        mask={mask}
        match={selectedMatch}
        matchPath={selectedMatch.image.files.CDM}
        matchThumbnail={selectedMatch.image.files.CDMThumbnail}
      >
        <Button
          type="button"
          onClick={handleDetailsToggle}
          style={{ float: "right" }}
        >
          {appState.compactMeta ? "Show" : "Hide"} Match Info
        </Button>
        {algorithm !== "pppm" && !mask.identityId ? (
          <ViewIn3DButton
            style={{ float: "right", marginRight: "0.5em" }}
            isLM={isLM}
            mask={mask}
            match={selectedMatch}
          />
        ) : (
          ""
        )}
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
