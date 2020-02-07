import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import CarouselElement from './CarouselElement'
import 'react-alice-carousel/lib/alice-carousel.css'

const GalleryCarousel = (props) => {
  const handleOnDragStart = (e) => e.preventDefault();

  return (
    <AliceCarousel mouseTrackingEnabled startIndex={2}>
      {props.children}
    </AliceCarousel>
  )
};

export default GalleryCarousel;