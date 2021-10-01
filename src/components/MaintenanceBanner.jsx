import React from "react";
import { Alert } from "antd";

export default function MaintenanceBanner() {
  return (
    <Alert
      style={{ margin: "2em", textAlign: "center" }}
      type="warning"
      showIcon
      message="Our services are down for maintenance and will return shortly"
    />
  );
}
