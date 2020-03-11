import React from "react";
import PropTypes from "prop-types";
import { Glyphicon } from "react-bootstrap";
import "./SpinnerIcon.css";

export default function SpinnerIcon(props) {
  const { children } = props;
  return (
    <Glyphicon glyph="refresh" className="spinning">
        {children}
    </Glyphicon>
  );
}

SpinnerIcon.propTypes = {
  children: PropTypes.object.isRequired
};
