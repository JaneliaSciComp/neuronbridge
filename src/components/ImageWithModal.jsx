import React, { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "./ImageWithModal.css";

export default function ImageWithModal(props) {
  const { thumbSrc, src, alt, showModal } = props;
  const [modalOpen, setModalOpen] = useState(false);

  if (showModal) {
    return (
      <Button className="modalButton" onClick={showModal}>
        <img className="thumbnail" src={thumbSrc} alt={alt} />
      </Button>
    );
  }

  return (
    <>
      <Button className="modalButton" onClick={() => setModalOpen(true)}>
        <img className="thumbnail" src={thumbSrc} alt={alt} />
      </Button>
      <Modal visible={modalOpen} onCancel={() => setModalOpen(false)} width="80%">
        <img src={src} alt={alt} />
      </Modal>
    </>
  );
}

ImageWithModal.propTypes = {
  src: PropTypes.string.isRequired,
  thumbSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  showModal: PropTypes.func
};

ImageWithModal.defaultProps = {
  alt: "Missing ALT tag",
  showModal: null
};
