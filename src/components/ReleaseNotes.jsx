import React, {useEffect, useState}  from "react";
import {useParams} from "react-router-dom";
import { Typography } from "antd";
import ReactMarkdown from "react-markdown";
import config from "../config";

const { Title } = Typography;

export default function ReleaseNotes() {
  const { name } = useParams();
  const [markdown, setMarkdown] = useState(null)
  const cref = config.releasenotes[name];
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(cref.url);
      if (response.status === 200) {
        const mdtext = await response.text();
        setMarkdown(mdtext);
      }
      else {
        setMarkdown(`Could not open release notes at ${cref.url}`);
      }
    }
    fetchData();
  }, [cref]); 

  return (
    <div>
      <Title>{cref.title} Release Notes</Title>
      <hr />
      <div className="App">
        <ReactMarkdown source={markdown} />
      </div>
      <hr />
    </div>
  );
}
