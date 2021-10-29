import React from "react";
import PropTypes from "prop-types";
import LineMeta from "../LineMeta";
import SkeletonMeta from "../SkeletonMeta";

export default function MatchMeta({ match, isLM, matchesList, compact, matchRank }) {

  const selectedMeta = isLM ? (
    <LineMeta attributes={match} compact={compact} />
  ) : (
    <SkeletonMeta attributes={match} compact={compact} />
  );

  return (
    <>
    <h3>
      Match {matchRank} of {matchesList.length}
    </h3>
    {selectedMeta}
    </>
  );
}

MatchMeta.propTypes = {
  matchesList: PropTypes.arrayOf(PropTypes.object),
  matchRank: PropTypes.number.isRequired,
  isLM: PropTypes.bool.isRequired,
  match: PropTypes.object,
  compact: PropTypes.bool
};

MatchMeta.defaultProps = {
  matchesList: [],
  match: {},
  compact: false
};
