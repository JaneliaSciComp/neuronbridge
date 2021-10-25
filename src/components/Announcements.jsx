import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Alert, Button } from "antd";

export default function Announcements({ source }) {
  // get the data from the source and then loop over it to generate an announcement
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch(source)
      .then(result => result.json())
      .then(messages => {
        setAnnouncements(messages);
      })
      .catch((error) => {
        console.log(error);
        setAnnouncements([]);
      });
  }, [source]);

  const formatted = announcements
    .filter(ann => {
      // only messages that start before current time and end after current
      // time should be shown.
      const now = Date.now();
      if (Date.parse(ann.start) <= now && now <= Date.parse(ann.end)) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      // sort messages so newest are at the top.
      return new Date(b.start) - new Date(a.start);
    })
    .map(ann => {
      const message = ann.stamp
        ? `${new Date(ann.start).toLocaleString()} - ${ann.message}`
        : ann.message;

      const action = ann.action ? (
        <Link to={ann.action.link}>
          <Button size="small" type="ghost">
            {ann.action.text}
          </Button>
        </Link>
      ) : null;

      return (
        <Alert
          style={{ marginBottom: "1em" }}
          key={ann.id}
          message={message}
          type={ann.type || "info"}
          closable={ann.closable}
          action={action}
        />
      );
    });

  return (
    <>
      {formatted}
      {formatted.length > 0 ? (
        <Link to="/announcements" style={{float: "left"}}>See all announcements</Link>
      ) : null}
    </>
  );
}

Announcements.propTypes = {
  source: PropTypes.string.isRequired
};
