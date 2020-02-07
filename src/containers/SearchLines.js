import React, {useEffect, useState} from 'react';
import {Button, Row, Input} from "antd";
import EntryList2 from "./EntryList2";
import GalleryDialog from "./GalleryDialog";

const { Search } = Input;

const url_path = 'https://color-depth-mips.s3.amazonaws.com/metadata/by_line/';

export default function SearchLines(props) {

  const [selectedValue, setSelectedValue] = React.useState(props.elemId);
  const [currResult, setCurrResult] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  const handleSearch = value => {
    console.log('handle search: ' + value);
    setSelectedValue(value);
  };

  function getLineInformation(name){
    if (name) {
      const path = url_path + name + '.json';
      fetch(path)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          setCurrResult(json['results']);
        }).catch(function(error) {
          console.log(error);
        });
      }
  };

  useEffect(() => {
    getLineInformation(selectedValue);
  },[selectedValue]);

  return (
      <div className="mt3">
       <h2>New Search</h2>
       <Search
         placeholder="input search text"
         enterButton="Find Lines"
         size="large"
         onSearch={value => handleSearch(value)}
       />
        { props.elemId ? (
          <EntryList2 elemId={selectedValue} listType="line" result={ currResult } />
        ) : (
          <div className="ma5 ">
            <p>Not sure which skeleton you want?</p>
            <p>You can search for lines on the Split-GAL4 website</p>
          </div>
        )}
     </div>
  );
}