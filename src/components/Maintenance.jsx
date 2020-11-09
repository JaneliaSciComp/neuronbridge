import React from "react";
import { Alert } from "antd";

export default function Maintenance() {
  return (
    <Alert
      style={{margin: "1em"}}
      type="error"
      message="Our search service is down for maintenance and will return shortly"
    />
  );
}
