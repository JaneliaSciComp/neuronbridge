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
              onSearch={value => context.getInformation(value, url_path)}
            />
          </div>
        )}
      </MyContext.Consumer>
  );
}

export default SearchSkeletons;