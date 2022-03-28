import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Typography } from "antd";
import { AppContext } from "../containers/AppContext";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import { signedPublicLink } from "../libs/awsLib";
import config from "../config";

const { Title } = Typography;

export default function ReleaseNotes() {
  const { appState } = useContext(AppContext);
  const { dataVersion } = appState;

  const { name } = useParams();
  const [markdown, setMarkdown] = useState(null);
  const cref = config.releasenotes[name];

  useEffect(() => {
    async function fetchData() {
      if (cref && dataVersion) {
        const finalUrl = cref.url.replace("{version}", dataVersion);
        const signedUrl = await signedPublicLink(finalUrl);
        const response = await fetch(signedUrl);
        if (response.status === 200) {
          const mdtext = await response.text();
          setMarkdown(mdtext);
        } else {
          setMarkdown(`Could not open release notes at ${finalUrl}`);
        }
      }
    }
    fetchData();
  }, [cref, dataVersion]);

  return (
    <div>
      <ScrollToTopOnMount />
      <Title>{cref.title} Release Notes</Title>
      <hr />
      <div className="App">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <hr />
    </div>
  );
}
