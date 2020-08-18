import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";
import { formatRelative } from "date-fns";
import ImageWithModal from "./ImageWithModal";
import { signedLink } from "../libs/awsLib";

export default function CustomInputSummary({ searchMeta }) {
  const history = useHistory();
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    const uploadUrl = `${searchMeta.searchDir}/${searchMeta.upload}`;
    signedLink(uploadUrl).then(result => setThumbnailUrl(result));
  }, [searchMeta]);



  return (
    <div style={{marginTop: '2em'}}>
      <h3>Input Image</h3>
      <Row>
        <Col xs={24} lg={8}>
          <ImageWithModal
            thumbSrc={thumbnailUrl}
            src={thumbnailUrl}
            title={searchMeta.upload}
          />
        </Col>
        <Col md={24} lg={6}>
          <p>
            <b>Name:</b> {searchMeta.upload}
          </p>
          <p>
            <b>Created:</b>{" "}
            {formatRelative(new Date(searchMeta.createdOn), new Date())}{" "}
          </p>
          <p>
            <b>Updated:</b>{" "}
            {formatRelative(new Date(searchMeta.updatedOn), new Date())}{" "}
          </p>
        </Col>
        <Col md={24} lg={6}>
          <p>
            <b>Anatomical Area:</b> {searchMeta.anatomicalRegion}
          </p>
          <p>
            <b>Channel:</b> {searchMeta.channel}
          </p>
          <p>
            <b>Algorithm:</b> {searchMeta.algorithm}
          </p>
        </Col>
        <Col md={24} lg={4}>
          <Button onClick={() => history.push("/mysearches")}>
            Back to all results
          </Button>
        </Col>
      </Row>
    </div>
  );
}

CustomInputSummary.propTypes = {
  searchMeta: PropTypes.object.isRequired
};
