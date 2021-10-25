import React, { useState, useEffect } from "react";
import { Card, Typography, Timeline } from "antd";
import config from "../config";

const { Title } = Typography;

export default function AnnouncementsArchive() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(config.announcements)
      .then(result => result.json())
      .then(messages => {
        setAnnouncements(messages);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setAnnouncements([]);
        setLoading(false);
      });
  }, [config.announcements]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const formatted = announcements
    .sort((a, b) => {
      // sort messages so newest are at the top.
      return new Date(b.start) - new Date(a.start);
    })
    .map(announcement => {
      const title = new Date(announcement.start).toLocaleString();
      return (
        <Timeline.Item key={announcement.id}>
          <Card
            title={title}
            style={{ marginBottom: "1em" }}
            size="small"
            headStyle={{ background: "#eee" }}
          >
            <p>{announcement.message}</p>
          </Card>
        </Timeline.Item>
      );
    });

  const noArchive = (
    <p>There are currently no archived announcements to show</p>
  );

  return (
    <>
      <Title level={3}>Announcements Archive</Title>
      {formatted.length > 0 ? <Timeline>{formatted}</Timeline> : noArchive}
    </>
  );
}
