import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Card, Checkbox, Typography, message } from "antd";

const { Title } = Typography;

export default function Account() {
  // const [survey, setSurvey] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load the logged in users attributes and see save the
    // survey and newsletter preferences to the state.
    async function getUserInfo() {
      const userInfo = await Auth.currentUserInfo();
      // setSurvey(userInfo.attributes["custom:survey"] === "true");
      setNewsLetter(userInfo.attributes["custom:newsletter"] === "true");
      setLoading(false);
    }
    getUserInfo();
  }, []);

  const handleNewsLetterChange = async event => {
    setNewsLetter(event.target.checked);
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      "custom:newsletter": event.target.checked.toString()
    }).catch(() => {
      message.error(
        "Unable to change newsletter preference, please try again later or contact us via the support email in the page footer."
      );
      setNewsLetter(!event.target.checked);
    });
  };

  /* const handleSurveyChange = async event => {
    setSurvey(event.target.checked);
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      "custom:survey": event.target.checked.toString()
    }).catch(() => {
      message.error(
        "Unable to change survey preference, please try again later."
      );
      setSurvey(!event.target.checked);
    });
  }; */

  return (
    <>
      <Title>Account Preferences</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card
            title="Updates and New Releases"
            style={{ marginBottom: "1em" }}
          >
            <p>
              Periodically, we will send out an email newsletter describing
              updates and new releases relating to NeuronBridge. By opting in
              you grant us permission to send emails to the email address you
              provided when logging in to this site.
            </p>
            <Checkbox checked={newsLetter} onChange={handleNewsLetterChange}>
              {" "}
              Yes, please send me updates.{" "}
            </Checkbox>
          </Card>
        </>
      )}
    </>
  );
}
