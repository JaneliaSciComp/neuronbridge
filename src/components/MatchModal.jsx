import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "antd";
import ImageComparison from "./ImageComparison";

export default function MatchModal(props) {
  const { open, setOpen, matchesList, mask, isLM } = props;

  const [maskOpen, setMaskOpen] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(open);
  }, [open]);

  const selectedMatch = matchesList[selected - 1];

  let metaBlock = <p>Loading...</p>;

  if (mask) {
    if (!isLM) {
      metaBlock = (
        <>
          <p>
            <b>Line Name:</b> {mask.attrs["Published Name"]}
          </p>
          <p>
            <b>Slide Code:</b> {mask.attrs["Slide Code"]}
          </p>
          <p>
            <b>Channel:</b> {mask.attrs.Channel}
          </p>
          <p>
            <b>Type:</b> {mask.attrs.Library}
          </p>
        </>
      );
    } else {
      // skeleton type from EM
      metaBlock = (
        <>
          <p>
            <b>Body Id:</b> {mask.attrs["Body Id"]}
          </p>
          <p>
            <b>Type:</b> {mask.attrs.Library}
          </p>
        </>
      );
    }
  }

  return (
    <Modal
      visible={Boolean(open)}
      onCancel={() => setOpen(0)}
      footer={[
        <Button
          key="prev"
          type="primary"
          disabled={selected <= 1}
          onClick={() => setSelected(selected - 1)}
        >
          Previous
        </Button>,
        <Button
          key="next"
          type="primary"
          disabled={selected >= matchesList.length}
          onClick={() => setSelected(selected + 1)}
        >
          Next
        </Button>,
        <Button
          key="mask"
          type="primary"
          onClick={() => setMaskOpen(!maskOpen)}
        >
          {maskOpen ? "Hide Mask" : "Show Mask"}
        </Button>,
        <Button key="back" type="primary" onClick={() => setOpen(0)}>
          Done
        </Button>
      ]}
      width="90%"
    >
      {selectedMatch && (
        <>
          <Row>
            <Col span={12}>
              <h3>Mask</h3>
              {metaBlock}
            </Col>
            <Col span={12}>
              <h3>
                Match {selected} of {matchesList.length}
              </h3>
              <p>
                <b>{isLM ? 'Line Name' : 'Body Id'}:</b> {selectedMatch.attrs.PublishedName}
              </p>
              <p>
                <b>Matched Slices:</b> {selectedMatch.attrs["Matched slices"]}
              </p>
              <p>
                <b>Score:</b> {selectedMatch.attrs.Score}
              </p>
              <p>
                <b>Type:</b> {selectedMatch.attrs.Library}
              </p>
            </Col>
          </Row>
          <ImageComparison maskOpen={maskOpen} maskPath={mask.image_path} matchPath={selectedMatch.image_path} />
        </>
      )}
    </Modal>
  );
}

MatchModal.propTypes = {
  open: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  matchesList: PropTypes.arrayOf(PropTypes.object),
  mask: PropTypes.object,
  isLM: PropTypes.bool.isRequired
};

MatchModal.defaultProps = {
  matchesList: [],
  mask: {}
};
