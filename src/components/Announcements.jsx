import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Alert, Button } from "antd";
import { Auth, API } from "aws-amplify";
import { useInterval } from "../libs/hooksLib";
import { AppContext } from "../containers/AppContext";

export default function Announcements() {
  // get the data from the source and then loop over it to generate an announcement
  const [announcements, setAnnouncements] = useState([]);
  const { appState, setPermanent } = useContext(AppContext);
  const { closedAnnouncements } = appState;

  function handleClose(id) {
    if (!closedAnnouncements.includes(id)) {
      closedAnnouncements.push(id);
      setPermanent({ closedAnnouncements });
    }
  }

  function updateAnnouncements() {
    Auth.currentCredentials().then(() => {
      API.get("SearchAPI", "/announcements", {
        queryStringParameters: { date: "all" }
      })
        .then(messages => {
          setAnnouncements(messages);
        })
        .catch(() => {
          setAnnouncements([]);
        });
    })
    .catch((error) => {
      if (!error.match(/mandatory signin enabled/)) {
        console.log(error);
      }
    });

  }

  // update the announcements every hour
  useInterval(() => updateAnnouncements(), 1000 * 60 * 60);

  useEffect(() => {
    updateAnnouncements();
  }, []);

  const formatted = announcements
    .filter(ann => {
      // filter closed messages
      if (
        closedAnnouncements &&
        closedAnnouncements.includes(ann.createdTime)
      ) {
        return false;
      }

      // only messages that start before current time and end after current
      // time should be shown.
      const now = new Date().getTime();
      if (
        new Date(parseInt(ann.startTime, 10)) <= now &&
        now <= new Date(parseInt(ann.endTime, 10))
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      // sort messages so newest are at the top.
      return (
        new Date(parseInt(b.startTime, 10)) -
        new Date(parseInt(a.startTime, 10))
      );
    })
    .map(ann => {
      const message = ann.stamp
        ? `${new Date(parseInt(ann.startTime, 10)).toLocaleString()} - ${
            ann.message
          }`
        : ann.message;

      let action = null;

      if (ann.actionLink) {
        if (ann.actionLink.match(/^http/)) {
          action = (
            <Button size="small" type="ghost" href={ann.actionLink}>
              {ann.actionText}
            </Button>
          );
        } else {
          action = (
            <Link to={{ pathname: ann.actionLink }}>
              <Button size="small" type="ghost">
                {ann.actionText}
              </Button>
            </Link>
          );
        }
      }

      return (
        <Alert
          style={{ marginBottom: "1em" }}
          key={ann.createdTime}
          message={message}
          type={ann.type || "info"}
          closable={ann.closable}
          onClose={() => handleClose(ann.createdTime)}
          action={action}
        />
      );
    });

  return (
    <>
      {formatted}
      {formatted.length > 0 ? (
        <Link to="/announcements" style={{ float: "left" }}>
          See all announcements
        </Link>
      ) : null}
    </>
  );
}
