import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { signedPublicLink } from "../libs/awsLib";

export default function ImagePlaceholder({
  src,
  alt,
  mirrored,
  imageDimensions,
  placeholderSrc,
  style,
  className
}) {
  const [signedSrc, setSignedSrc] = useState();
  const [imageLoaded, setLoaded] = useState(false);

  const updatedStyle = mirrored
    ? {
        ...style,
        transition: "transform .25s ease-in-out",
        transform: "scaleX(-1)",
        width: "100%",
        height: "auto"
      }
    : {
        ...style,
        transition: "transform .25s ease-in-out",
        transform: "scaleX(1)",
        width: "100%",
        height: "auto"
      };

  useEffect(() => {
    if (src) {
      // Prevents blinking of image when the same image is loaded into
      // the page more than once, it was blinking to the placeholder image.
      // We only want the placeholder image to show up if a new image
      // is loaded. To fix that we check the path of the image being
      // loaded and if it matches the previous path, we leave the
      // loaded status set to true.
      // A lot of the images are signed and their full url will not
      // be the same in subsequent calls. However, the path will be
      // identical, so we can just check that to see if we need to
      // reload the image.
      const path = new URL(src).pathname;
      const loadedPath = imageLoaded ? new URL(imageLoaded).pathname : null;
      if (path !== loadedPath) {
        setLoaded(false);
      }
      signedPublicLink(src).then(signed => {
        const img = new Image();
        img.onload = () => {
          setSignedSrc(signed);
          setLoaded(src);
        };
        img.src = signed;
      });
    }
  }, [src, imageLoaded]);

  function handleLoaded(imgSrc) {
    setLoaded(imgSrc);
  }

  return (
    <>
      {imageLoaded ? (
        <img
          src={signedSrc}
          style={updatedStyle}
          alt={alt}
          onLoad={() => handleLoaded(src)}
          height={imageDimensions[0]}
          width={imageDimensions[1]}
          className={className}
        />
      ) : (
        <img
          src={placeholderSrc}
          style={updatedStyle}
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
  className: ""
};
