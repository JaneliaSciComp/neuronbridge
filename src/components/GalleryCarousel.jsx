import React from 'react'
import PropTypes from "prop-types";
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const GalleryCarousel = (props) => {
  const { children } = props;

  return (
    <AliceCarousel mouseTrackingEnabled startIndex={2} duration={0}>
      {children}
    </AliceCarousel>
  )
};

GalleryCarousel.propTypes = {
  children: PropTypes.object.isRequired
};

export default GalleryCarousel;
