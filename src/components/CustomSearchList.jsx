import React from "react";
import { Typography } from "antd";
import SearchUpload from "./SearchUpload";
import SearchesInProgress from "./SearchesInProgress";
import SearchesComplete from "./SearchesComplete";

const { Title } = Typography;

export default function CustomSearchList() {
  return (
    <div>
      <Title level={2}>My Searches</Title>
      <SearchUpload />
      <Title level={3}>Searches in progress</Title>
      <SearchesInProgress />
      <Title level={3}>Searches completed</Title>
      <SearchesComplete />
    </div>
  );
}
