import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Checkbox, Typography } from "antd";

const { Title } = Typography;

export default function Account() {
  const [survey, setSurvey] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load the logged in users attributes and see save the
    // survey and newsletter preferences to the state.
    async function getUserInfo() {
      const userInfo = await Auth.currentUserInfo();
      console.log(userInfo.attributes);
      setSurvey(userInfo.attributes["custom:survey"] === "true");
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
    }).catch(() => setNewsLetter(!event.target.checked));
  };

  const handleSurveyChange = async event => {
    setSurvey(event.target.checked);
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      "custom:survey": event.target.checked.toString()
    }).catch(error => {
      console.log(error);
      setSurvey(!event.target.checked);
    });
  };

  return (
    <>
      <Title>Your Account Preferences</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Checkbox checked={newsLetter} onChange={handleNewsLetterChange}>
            {" "}
            Email newsletter
          </Checkbox>
          <Checkbox checked={survey} onChange={handleSurveyChange}>
            {" "}
            Feedback surveys
          </Checkbox>
        </>
      )}
    </>
  );
}
