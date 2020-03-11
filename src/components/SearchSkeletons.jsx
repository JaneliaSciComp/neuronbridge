import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { Redirect } from "react-router-dom";

const { Search } = Input;

function SearchSkeletons(props) {
  const { searchTerm} = props;
  const [inputTerm, setInputTerm] = useState(null);

  if (inputTerm && inputTerm !== "") {
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
        defaultValue={searchTerm}
        onSearch={value => setInputTerm(value)}
      />
    </div>
  );
}

SearchSkeletons.propTypes = {
  searchTerm: PropTypes.string
};

SearchSkeletons.defaultProps = {
  searchTerm: "332685751"
};

export default SearchSkeletons;
