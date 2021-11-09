import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { signedPublicLink } from "../libs/awsLib";

export default function ImagePlaceholder({src, alt, mirrored, imageDimensions, placeholderSrc, style, className}) {
  const [signedSrc, setSignedSrc] = useState();
  const [imageLoaded, setLoaded] = useState(false);


  const updatedStyle = mirrored
    ? { ...style, transition: "transform .25s ease-in-out", transform: "scaleX(-1)" }
    : { ...style, transition: "transform .25s ease-in-out", transform: "scaleX(1)" };

  useEffect(() => {
    if (src) {
      signedPublicLink(src).then(signed => {
        const img = new Image();
        img.onload = () => {
          setSignedSrc(signed);
          setLoaded(true);
        };
        img.src = signed;
      });
    }
  }, [src]);

  function handleLoaded() {
    setLoaded(true);
  }

  return (
    <>
    {imageLoaded ? (
          <img
            src={signedSrc}
            style={updatedStyle}
            alt={alt}
            onLoad={handleLoaded}
            height={imageDimensions[0]}
            width={imageDimensions[1]}
            className={className}
          />
        ) : (
          <img
            style={updatedStyle}
            src={placeholderSrc}
            alt="placeholder"
            height={imageDimensions[0]}
            width={imageDimensions[1]}
            className={className}
          />
        )}
    </>
  );
}

ImagePlaceholder.propTypes = {
  src: PropTypes.string.isRequired,
  placeholderSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  imageDimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  mirrored: PropTypes.bool
};

ImagePlaceholder.defaultProps = {
  mirrored: false,
  style: {},
  className: ''
};
