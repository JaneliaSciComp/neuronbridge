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
  className,
  maxHeight,
  maxWidth,
}) {
  const [signedSrc, setSignedSrc] = useState();
  const [imageLoaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState();

  const updatedStyle = mirrored
    ? {
        ...style,
        transition: "transform .25s ease-in-out",
        transform: "scaleX(-1)",
        width: maxHeight ? "auto" : "100%",
        height: maxHeight ? "100%" : "auto",
      }
    : {
        ...style,
        transition: "transform .25s ease-in-out",
        transform: "scaleX(1)",
        width: maxHeight ? "auto" : "100%",
        height: maxHeight ? "100%" : "auto",
      };

  if (maxHeight) {
    updatedStyle.maxHeight = maxHeight;
  }
  if (maxWidth) {
    updatedStyle.maxWidth = maxWidth;
  }

  useEffect(() => {
    if (src && !loadError) {
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
      try {
        const path = new URL(src, window.location.origin).pathname;
        const loadedPath = imageLoaded ? new URL(imageLoaded, window.location.origin).pathname : null;
        if (path !== loadedPath) {
          setLoaded(false);
        }
        signedPublicLink(src).then((signed) => {
          const img = new Image();
          img.onload = () => {
            setSignedSrc(signed);
            setLoaded(src);
          };
          img.src = signed;
        });
      } catch (error) {
        setLoadError(error);
      }
    }
  }, [src, imageLoaded, loadError]);

  function handleLoaded(imgSrc) {
    setLoaded(imgSrc);
  }

  if (loadError) {
    return <p style={{ color: "#f00" }}>Error Loading Image</p>;
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
  mirrored: PropTypes.bool,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string
};

ImagePlaceholder.defaultProps = {
  mirrored: false,
  style: {},
  className: "",
  maxHeight: null,
  maxWidth: null,
};
