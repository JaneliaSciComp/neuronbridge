import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown } from "antd";
import {
  EllipsisOutlined,
} from "@ant-design/icons";

export default function ImageActions({contextMenu, children}) {

  return (
    <>
    {children}
    <Dropdown overlay={contextMenu}>
      <Button style={{marginRight: "0.5em", marginBottom: "0.5em"}}>
        <EllipsisOutlined />
      </Button>
    </Dropdown>
    </>
  );
}

ImageActions.propTypes = {
  contextMenu: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.element])
};

ImageActions.defaultProps = {
  children: null
};
