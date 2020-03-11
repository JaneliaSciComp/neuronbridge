import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Input, Radio } from "antd";
import "./SearchLines.css";
import "./LoaderButton.css";

const { Search } = Input;

export default function SearchLines(props) {
  const { searchTerm } = props;
  const history = useHistory();

  const handleSearch = value => {
    history.push(`/search/lines/${value}`);
  };

  return (
    <div className="mt3">
      <Search
        placeholder="input search text"
        enterButton="Find Lines"
        size="large"
        defaultValue={searchTerm}
        onSearch={value => handleSearch(value)}
      />
      <Radio.Group className="searchType">
        <Radio value="light">Light Microscopy</Radio>
        <Radio value="em">Electron Microscopy</Radio>
      </Radio.Group>
    </div>
  );
}

SearchLines.propTypes = {
  searchTerm: PropTypes.string
};

SearchLines.defaultProps = {
  searchTerm: "SS02256"
};
