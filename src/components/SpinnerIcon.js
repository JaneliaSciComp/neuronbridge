import React from "react";
import { Glyphicon } from "react-bootstrap";
import "./SpinnerIcon.css";

export default function SpinnerIcon(props) {
  return (
    <Glyphicon glyph="refresh" className="spinning">
        {props.children}
    </Glyphicon>
  );
}
