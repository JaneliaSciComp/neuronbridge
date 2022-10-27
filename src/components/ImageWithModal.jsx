import React, { useState, useEffect } from "react";
import { Modal, Button, Skeleton } from "antd";
import PropTypes from "prop-types";
import "./ImageWithModal.css";
import ImagePlaceholder from "./ImagePlaceholder";
import { signedPublicLink } from "../libs/awsLib";


export default function ImageWithModal(props) {
  const { thumbSrc, src, title, showModal, vertical, maxHeight } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [signedSrc, setSignedSrc] = useState();
  const [signedThumbnailSrc, setSignedThumbnailSrc] = useState();

  const imageDimensions = vertical ? ["497px", "236px"] : ["236px", "497px"];
  const placeholderSrc = vertical
    ? "/vnc_placeholder_thumbnail.jpg"
    : "/brain_placeholder.png";

  useEffect(() => {
    signedPublicLink(thumbSrc).then(signed => {
      setSignedThumbnailSrc(signed);
    });
    signedPublicLink(src).then(signed => {
      setSignedSrc(signed);
    });
  }, [thumbSrc, src]);

  if (!signedSrc || !signedThumbnailSrc) {
    return <Skeleton.Image size="large" />;
  }



  if (showModal) {
    return (
      <Button className="modalButton" onClick={showModal}>
        <ImagePlaceholder
          src={signedThumbnailSrc}
          alt={title}
          placeholderSrc={placeholderSrc}
          imageDimensions={imageDimensions}
          className="thumbnail"
          maxHeight={maxHeight}
        />
      </Button>
    );
  }

  return (
    <>
      <Button className="modalButton" onClick={() => setModalOpen(true)}>
        <ImagePlaceholder
          src={signedThumbnailSrc}
          alt={title}
          placeholderSrc={placeholderSrc}
          imageDimensions={imageDimensions}
          className="thumbnail"
          maxHeight={maxHeight}
        />
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
        <img className="limitedheight" src={signedSrc} alt={title} />
      </Modal>
    </>
  );
}

ImageWithModal.propTypes = {
  src: PropTypes.string.isRequired,
  thumbSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  showModal: PropTypes.func,
  vertical: PropTypes.bool,
  maxHeight: PropTypes.string
};

ImageWithModal.defaultProps = {
  title: "Missing",
  showModal: null,
  vertical: false,
  maxHeight: null
};
