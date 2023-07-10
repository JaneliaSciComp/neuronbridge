import React, { useState, useEffect, useContext } from "react";
import { Auth, API } from "aws-amplify";
import { Button, Card, Checkbox, Typography, message } from "antd";
import PropTypes from "prop-types";
import { AppContext } from "../containers/AppContext";

const { Title } = Typography;

export default function Account({ skipPrefs }) {
  const [userPrefs, setUserPrefs] = useState({});
  const [loading, setLoading] = useState(true);
  const { resetPermanent } = useContext(AppContext);

  useEffect(() => {
    // load the logged in users attributes and see save the
    // preferences to the state.
    if (!skipPrefs) {
      async function getUserInfo() {
        Auth.currentCredentials().then(() => {
          API.get("SearchAPI", "/preferences")
            .then(preferences => {
              setUserPrefs(preferences);
            })
            .catch(() => {
              setUserPrefs({});
            });
        });
        setLoading(false);
      }
      getUserInfo();
    }
  }, [skipPrefs]);

  const handleNewsLetterChange = async event => {
    setUserPrefs({ ...userPrefs, mailingList: event.target.checked });
    Auth.currentCredentials().then(() => {
      API.post("SearchAPI", "/preferences", {
        body: { mailingList: event.target.checked }
      })
        .then(preferences => {
          message.success("Your newsletter preferences have been updated.");
          setUserPrefs(preferences);
        })
        .catch(() => {
          setUserPrefs({ ...userPrefs, mailingList: !event.target.checked });
          message.error(
            "Unable to change newsletter preference, please try again later or contact us via the support email in the page footer."
          );
        });
    });
  };

  function handleReset() {
    resetPermanent();
    window.location.reload();
  }

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
            headStyle={{ background: "#efefef" }}
          >
            <p>
              Periodically, we will send out an email newsletter describing
              updates and new releases relating to NeuronBridge. By opting in
              you grant us permission to send emails to the email address you
              provided when logging in to this site.
            </p>
            <Checkbox
              disabled={loading}
              checked={userPrefs?.mailingList}
              onChange={handleNewsLetterChange}
            >
              {" "}
              Yes, please send me updates.{" "}
            </Checkbox>
          </Card>
          <Card
            title="Reset Preferences"
            style={{ marginBottom: "1em" }}
            headStyle={{ background: "#efefef" }}
          >
            <p>
              If you would like to see the site without any of your preferences
              applied, please reset them here.
            </p>
            <Button onClick={handleReset}>Reset to defaults</Button>
          </Card>
        </>
      )}
    </>
  );
}

Account.defaultProps = {
  skipPrefs: false
};

Account.propTypes = {
  skipPrefs: PropTypes.bool
};
