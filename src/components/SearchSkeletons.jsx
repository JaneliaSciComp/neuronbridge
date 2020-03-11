import React, { useState } from "react";
import { Input } from "antd";
import { Redirect } from "react-router-dom";

function SearchSkeletons(props) {
  const { Search } = Input;
  const defaultValue = props.searchTerm || "332685751";
  const [searchTerm, setSearchTerm] = React.useState(null);

  if (searchTerm && searchTerm !== "") {
    return (
      <Redirect
        to={{
          pathname: `/search/skeletons/${searchTerm}`
        }}
      />
    );
  }

  return (
    <div className="mt3">
      <h2>Search for Electron Microscopy Skeletons</h2>
      <Search
        id="search-field"
        placeholder="input search text"
        enterButton="Find Skeletons"
        size="large"
        defaultValue={defaultValue}
        onSearch={value => setSearchTerm(value)}
      />
    </div>
  );
}

export default SearchSkeletons;
