import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Divider, Typography, Button, Tooltip, Row, Col, Alert } from "antd";
import { CloseOutlined, ExclamationCircleTwoTone } from "@ant-design/icons";
import { formatRelative } from "date-fns";
import SearchSteps from "./SearchSteps";
import { deleteSearch } from "../libs/awsLib";

const { Text } = Typography;

// This warning message shouldn't load if there is already a mask file.
function MaskSelectionLink({ search }) {
  const maskSelectionURL = `/mask-selection/${search.id}`;
  return (
    <div>
      <Alert
        type="success"
        showIcon
        message="Your image alignment has completed."
        style={{ marginBottom: "0.5em" }}
      />
      <Text component="p" strong>
        <ExclamationCircleTwoTone twoToneColor="#ff0000" /> To start the color
        depth search{" "}
        <Link
          to={maskSelectionURL}
          className="ant-btn ant-btn-primary"
          style={{ color: "#fff" }}
        >
          select a channel and mask region
        </Link>
      </Text>
    </div>
  );
}

MaskSelectionLink.propTypes = {
  search: PropTypes.object.isRequired
};

function AlignmentWarning() {
  return (
    <Alert
      type="warning"
      showIcon
      message="The alignment step can take more than 30 minutes to complete. This page will automatically update once the alignment is finished."
    />
  );
}
export default function SearchesInProgress({ searches }) {
  const searchesInProgress = searches
    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
    .map(search => {
      const showMaskSelection =
        search.step === 2 && !search.searchMask ? (
          <MaskSelectionLink search={search} />
        ) : (
          ""
        );

      return (
        <div key={search.id}>
          <Row>
            <Col span={23}>
              <Text strong> &raquo; {search.upload}</Text>{" "}
              <Text type="secondary">
                {formatRelative(new Date(search.createdOn), new Date())}
              </Text>
            </Col>
            <Col span={1}>
              <Tooltip title="Delete">
                <Button
                  danger
                  size="small"
                  shape="circle"
                  onClick={() => deleteSearch(search)}
                  icon={<CloseOutlined />}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ marginTop: "1em" }}>
              <SearchSteps search={search} />
              {search.step === 1 && <AlignmentWarning />}
              {showMaskSelection}
            </Col>
          </Row>
          <Divider />
        </div>
      );
    });

  if (searchesInProgress.length === 0) {
    return (
      <Alert
        type="warning"
        showIcon
        message="You don't have any searches currently running. Start a new search by uploading an image above."
      />
    );
  }

  return <div>{searchesInProgress}</div>;
}

SearchesInProgress.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.object).isRequired
};
