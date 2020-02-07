import React, {useEffect, useState} from 'react';
import {Button, Row, Col, Input, Carousel} from "antd";
import GalleryDialog from "./GalleryDialog";

export default function Gallery(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('initial');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
      <div>
        <GalleryDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
      </div>
  );
}