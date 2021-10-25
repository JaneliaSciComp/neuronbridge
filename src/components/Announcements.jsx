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
      });
  }, [source]);

  const formatted = announcements
    .filter(ann => {
      return ann.message
      // TODO: only messages that start before current time and end after current
      // time should be shown.
    })
    .sort((a,b) => {
    // sort messages so newest are at the top.
    return new Date(b.start) - new Date(a.start)
  }).map(ann => {
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
        key={ann.start}
        message={message}
        type={ann.type || "info"}
        closable={ann.closable}
        action={action}
      />
    );
  });

  return <>{formatted}</>;
}

Announcements.propTypes = {
  source: PropTypes.string.isRequired
};
