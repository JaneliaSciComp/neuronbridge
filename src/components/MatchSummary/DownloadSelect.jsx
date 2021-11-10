import React from "react";
import PropTypes from "prop-types";
import { Button, Checkbox } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useMatches } from "../../containers/MatchesContext";

export default function DownloadSelect({ id, asButton }) {
  const { state, dispatch } = useMatches();
  const checked = state.selected.includes(id);

  const handleChange = () => {
    if (!checked) {
      dispatch({ type: "add", payload: id });
    } else {
      dispatch({ type: "remove", payload: id });
    }
  };

  if (asButton) {
    return (
      <Button
        onClick={handleChange}
        type={checked ? "primary" : "default"}
        ghost={checked}
      >
        Download {checked ? <CheckOutlined /> : null}
      </Button>
    );
  }

  return (
    <Checkbox
      style={{
        position: "absolute",
        top: "0px",
        left: "10px",
        zIndex: 2,
        padding: "1em"
      }}
      onChange={handleChange}
      checked={checked}
    />
  );
}

DownloadSelect.propTypes = {
  id: PropTypes.string.isRequired,
  asButton: PropTypes.bool
};

DownloadSelect.defaultProps = {
  asButton: false
};
