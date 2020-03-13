import React, { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import "./ImageWithModal.css";

export default function ImageWithModal(props) {
  const { thumbSrc, src, alt } = props;
  const [modalOpen, setModalOpen] = useState(false);

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
  alt: PropTypes.string
};

ImageWithModal.defaultProps = {
  alt: "Missing ALT tag"
};
