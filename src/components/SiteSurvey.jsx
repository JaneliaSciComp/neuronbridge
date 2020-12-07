import React from "react";
import { Alert, Button, Space } from "antd";

export default function SiteSurvey() {
  return (
    <Alert
      type="info"
      message="Please take our site feedback survey"
      action={
        <Space direction="horizontal">
          <Button size="small" type="primary">
            Accept
          </Button>
          <Button size="small" danger type="ghost">
            Decline
          </Button>
        </Space>
      }
    />
  );
}
