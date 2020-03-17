import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "antd";

export default function MatchModal(props) {
  const { open, setOpen, matchesList, mask } = props;

  const [maskOpen, setMaskOpen] = useState(true);
  const [selected, setSelected] = useState(0);

  const selectedMatch = matchesList[selected];

  return (
    <Modal
      visible={Boolean(open)}
      onCancel={() => setOpen(null)}
      footer={[
        <Button
          key="prev"
          type="primary"
          disabled={selected <= 1}
          onClick={() => setSelected(selected + 1)}
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
        <Button key="back" type="primary" onClick={() => setOpen(false)}>
          Done
        </Button>
      ]}
      width="90%"
    >
      <Row>
        {maskOpen && (
          <Col span={12}>
            <p>Mask</p>
            <img src={mask.image_path} alt="Mask for search" />
          </Col>
        )}
        <Col span={maskOpen ? 12 : 24}>
          <p>Match</p>
          <img
            src={selectedMatch && selectedMatch.image_path}
            alt="Search Match"
          />
        </Col>
      </Row>
    </Modal>
  );
}

MatchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  matchesList: PropTypes.object,
  mask: PropTypes.object
};

MatchModal.defaultProps = {
  matchesList: {},
  mask: {}
};
