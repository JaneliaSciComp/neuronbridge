import React, { useState, useEffect } from "react";
import { Modal, Button, Skeleton } from "antd";
import PropTypes from "prop-types";
import "./ImageWithModal.css";
import { signedPublicLink } from "../libs/awsLib";

export default function ImageWithModal(props) {
  const { thumbSrc, src, title, showModal } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [signedSrc, setSignedSrc] = useState();
  const [signedThumbnailSrc, setSignedThumbnailSrc] = useState();


  useEffect(() => {
    signedPublicLink(thumbSrc).then(signed => {
      setSignedThumbnailSrc(signed);
    });
    signedPublicLink(src).then(signed => {
      setSignedSrc(signed);
    });
  },[thumbSrc, src]);

  if (!signedSrc || !signedThumbnailSrc) {
    return (<Skeleton.Image size="large"/>);
  }

  if (showModal) {
    return (
      <Button className="modalButton" onClick={showModal}>
        <img className="thumbnail" src={signedThumbnailSrc} alt={title} style={{width: "100%"}} />
      </Button>
    );
  }

  return (
    <>
      <Button className="modalButton" onClick={() => setModalOpen(true)}>
        <img className="thumbnail" src={signedThumbnailSrc} alt={title} />
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
        <img src={signedSrc} alt={title} />
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
