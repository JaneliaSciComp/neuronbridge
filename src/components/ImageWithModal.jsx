import React, { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "./ImageWithModal.css";

export default function ImageWithModal(props) {
  const { thumbSrc, src, title, showModal } = props;
  const [modalOpen, setModalOpen] = useState(false);

  if (showModal) {
    return (
      <Button className="modalButton" onClick={showModal}>
        <img className="thumbnail" src={thumbSrc} alt={title} />
      </Button>
    );
  }

  return (
    <>
      <Button className="modalButton" onClick={() => setModalOpen(true)}>
        <img className="thumbnail" src={thumbSrc} alt={title} />
      </Button>
      <Modal
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        width="80%"
        footer={[
          <Button key="back" type="primary" onClick={() => setModalOpen(false)}>
            Done
          </Button>
        ]}
      >
        <p>{title}</p>
        <img src={src} alt={title} />
      </Modal>
    </>
  );
}

ImageWithModal.propTypes = {
  src: PropTypes.string.isRequired,
  thumbSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  showModal: PropTypes.func
};

ImageWithModal.defaultProps = {
  title: "Missing",
  showModal: null
};
