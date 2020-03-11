import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import SpinnerIcon from "./SpinnerIcon";
import "./LoaderButton.css";

export default function LoaderButton(props) {
  const { isLoading, className, disabled, children } = props;
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {isLoading && <SpinnerIcon />}
      {children}
    </Button>
  );
}

LoaderButton.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.object.isRequired
};

LoaderButton.defaultProps = {
  isLoading: false,
  className: "",
  disabled: false
};
