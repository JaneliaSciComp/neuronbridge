import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Button, Badge } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useMatches } from "../containers/MatchesContext";
import ResultsExport from "./ResultsExport";
import ImageExport from "./ImageExport";

export default function ExportMenu({ results, searchType, searchId }) {
  const { state } = useMatches();

  const resultsWithPosition = results.map((result, i) => {
    const updated = result;
    updated.position = i + 1;
    return updated;
  });

  const selectedResults =
    state.selected.length <= 0
      ? resultsWithPosition
      : resultsWithPosition.filter(result =>
          state.selected.includes(result.id)
        );

  const menu = (
    <Menu>
      <Menu.Item>
        <ResultsExport results={selectedResults} searchType={searchType} />
      </Menu.Item>
      <Menu.Item>
        <ImageExport
          ids={selectedResults.map(result => result.id)}
          isFiltered={state.selected.length >= 1}
          searchId={searchId}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Badge
        style={{ backgroundColor: "#008b94" }}
        count={selectedResults.length}
      >
        <Button onClick={e => e.preventDefault()}>
          <DownloadOutlined /> Download
        </Button>
      </Badge>
    </Dropdown>
  );
}

ExportMenu.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchType: PropTypes.string.isRequired,
  searchId: PropTypes.string.isRequired
};
