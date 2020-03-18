import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

export default function LoaderButton(props) {
  const { isLoading, disabled, children } = props;
  return (
    <Button
      loading={isLoading}
      disabled={disabled || isLoading}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    >
      {children}
    </Button>
  );
}

LoaderButton.propTypes = {
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired
};

LoaderButton.defaultProps = {
  isLoading: false,
  disabled: false
};
