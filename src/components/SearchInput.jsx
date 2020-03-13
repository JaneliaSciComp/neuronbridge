import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Input, Radio } from "antd";
import "./SearchInput.css";
import "./LoaderButton.css";

const { Search } = Input;

export default function SearchInput(props) {
  const { searchTerm } = props;
  const [searchType, setSearchType] = useState("lines");
  const history = useHistory();

  const handleSearch = value => {
    history.push(`/search/${searchType}/${value}`);
  };

  const onChange = e => {
    setSearchType(e.target.value);
  };

  return (
    <div className="searchInput">
      <Search
        placeholder="Search with a line name or skeleton id."
        enterButton="Search"
        size="large"
        defaultValue={searchTerm}
        onSearch={value => handleSearch(value)}
      />
      <Radio.Group
        className="searchType"
        onChange={onChange}
        value={searchType}
      >
        <Radio value="lines">Light Microscopy</Radio>
        <Radio value="skeletons">Electron Microscopy</Radio>
      </Radio.Group>
    </div>
  );
}

SearchInput.propTypes = {
  searchTerm: PropTypes.string
};

SearchInput.defaultProps = {
  searchTerm: "LH1046,788306724,332685751"
};
