import React, {Component, useEffect} from 'react';

const CarouselElement = (props) => {
  const handleOnDragStart = (e) => e.preventDefault();

  const elements = props.content.elements;

  const element = [];
  // function myFunction(item) {
  //   const keys = Object.keys(item);
  //   console.log(keys);
  //   return <div><strong>item: </strong>props.content[item]</div>
  // }
  //
  // const element = elements.map(x => {
  //   return myFunction(x);
  // });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("content " + props.content);
  });

  return (
     <div>
       json.dumps({props.content})
     </div>
  )
};

export default CarouselElement;