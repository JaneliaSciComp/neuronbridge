import React, {useEffect, useState} from 'react';
import {Input} from "antd";
import EntryList2 from "./EntryList2";
import MyContext from "./MyContext";

const url_path =  'https://color-depth-mips.s3.amazonaws.com/metadata/by_body/';

function SearchSkeletons(props) {
  const { Search } = Input;
  const [currResult, setCurrResult] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState(props.elemId);

  const handleSearch = value => {
    setSelectedValue(value);
  };

  useEffect(() => {
    getBodyInformation(selectedValue);
  },[selectedValue]);

  function getBodyInformation(name){
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

  return (
      <MyContext.Consumer>
        {context => (
          <div className="mt3">
            <h2>New Search</h2>
            <Search id='search-field'
              placeholder="input search text"
              enterButton="Find Skeletons"
              size="large"
              defaultValue="1002507170"
              onSearch={value => handleSearch(value)}
              onClick={value => handleSearch(value)}
            />
            { selectedValue ? (
              <EntryList2 elemId={selectedValue} searchType="skeleton" result={ currResult } />
            ) : (
              <div className="ma5 ">
                <p>Not sure which skeleton you want?</p>
                <p>You can search for lines on the Split-GAL4 website</p>
              </div>
            )}
          </div>
        )}
      </MyContext.Consumer>
  );
}

export default SearchSkeletons;