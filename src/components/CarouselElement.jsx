import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const CarouselElement = (props) => {
  const  { content } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log(`content ${content}`);
  });

  return (
     <div>
       json.dumps({content})
     </div>
  )
};

CarouselElement.propTypes = {
  content: PropTypes.object.isRequired
};


export default CarouselElement;
