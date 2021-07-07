import React from "react";
import PropTypes from "prop-types";
import LineSummary from "./LineSummary";
import PPPSummary from "./PPPSummary";
import SkeletonSummary from "./SkeletonSummary";

export default function SearchSummary({type, input}) {

  if (type === "lines") {
    return <LineSummary lineMeta={input} />
  }

  if (type === "ppp") {
    return <PPPSummary metaInfo={input}/>
  }

  return <SkeletonSummary metaInfo={input} />
}

SearchSummary.propTypes = {
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired
};
