import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Timeline, message } from "antd";
import { Auth, API } from "aws-amplify";
import { AppContext } from "../containers/AppContext";
import AnnouncementsDelete from "./AnnouncementsDelete";

const { Title } = Typography;

export default function AnnouncementsArchive() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { appState } = useContext(AppContext);

  useEffect(() => {
    Auth.currentCredentials().then(() => {
      API.get("SearchAPI", "/announcements", {
        queryStringParameters: { date: "all" }
      })
        .then(messages => {
          setAnnouncements(messages);
          setLoading(false);
        })
        .catch(error => {
          message.error(error.message);
          setAnnouncements([]);
          setLoading(false);
        });
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const formatted = announcements
    .sort((a, b) => {
      // sort messages so newest are at the top.
      const sorted =
        new Date(parseInt(b.startTime, 10)) -
        new Date(parseInt(a.startTime, 10))
      return sorted;
    })
    .map(announcement => {
      const title = new Date(
        parseInt(announcement.startTime, 10)
      ).toLocaleString();
      return (
        <Timeline.Item key={announcement.createdTime}>
          <Card
            title={title}
            style={{ marginBottom: "1em" }}
            size="small"
            headStyle={{ background: "#eee" }}
            extra={
              appState.isAdmin ? (
                <AnnouncementsDelete id={announcement.createdTime} />
              ) : null
            }
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
