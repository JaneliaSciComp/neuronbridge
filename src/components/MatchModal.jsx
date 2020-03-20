import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "antd";

export default function MatchModal(props) {
  const { open, setOpen, matchesList, mask } = props;

  const [maskOpen, setMaskOpen] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(open);
  }, [open]);

  const selectedMatch = matchesList[selected - 1];

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


            </Col>
            <Col span={12}>
              <h3>Match {selected} of {matchesList.length}</h3>
              <p>
                <b>Line Name:</b> {selectedMatch.attrs.PublishedName}
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
          <Row>
            {maskOpen && (
              <Col span={12}>
                <img src={mask.image_path} alt="Mask for search" />
              </Col>
            )}
            <Col span={maskOpen ? 12 : 24}>
              <img src={selectedMatch.image_path} alt="Search Match" />
            </Col>
          </Row>
        </>
      )}
    </Modal>
  );
}

MatchModal.propTypes = {
  open: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  matchesList: PropTypes.arrayOf(PropTypes.object),
  mask: PropTypes.object
};

MatchModal.defaultProps = {
  matchesList: [],
  mask: {}
};
