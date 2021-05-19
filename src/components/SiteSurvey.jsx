import React from "react";
import { Alert, Button, Space } from "antd";
import { useCookies } from 'react-cookie';

export default function SiteSurvey() {
  const [cookies, setCookie] = useCookies(['hideSurvey']);
  // check for site survey cookie
  // if present, hide the survey alert.
  if (cookies.hideSurvey === 'hide') {
    return '';
  }

  function handlePermaHide() {
    setCookie('hideSurvey', 'hide', { path: '/' });
  }

  function handleTakeSurvey() {
    handlePermaHide();
    window.location.assign('https://forms.gle/tJa6GAwEjs7fykhG7');
  }

  return (
    <Alert
      role="alert"
      type="warning"
      style={{ marginBottom: "1em" }}
      message="Please take a moment to fill out our site feedback survey."
      action={
        <Space direction="horizontal">
          <Button size="small" type="primary" onClick={() => handleTakeSurvey()}>
            Take Survey
          </Button>
            <Button size="small" danger type="ghost" onClick={() => handlePermaHide()}>
            Hide Forever
          </Button>
        </Space>
      }
    />
  );
}
