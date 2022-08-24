import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Citations({ match }) {
  return (
    <div>
      <h3>Citations here</h3>
      <ul>
        <li>List of citations</li>
        <li>for the match and the input?</li>
        <li>Need the lookup table</li>
      </ul>
      <p>{match.id}</p>
      <p>See also, the <Link to="/about">references section</Link> on our about page</p>
    </div>
  );
}

Citations.propTypes = {
  match: PropTypes.object.isRequired,
};
