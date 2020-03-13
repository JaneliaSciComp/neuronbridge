import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Input, Radio } from "antd";
import "./SearchInput.css";
import "./LoaderButton.css";
import { AppContext } from "../containers/AppContext";

const { Search } = Input;

export default function SearchInput(props) {
  const { searchTerm } = props;
  const history = useHistory();
  const [state, setState] = useContext(AppContext);

  const handleSearch = value => {
    history.push(`/search/${state.searchType}/${value}`);
  };

  const onChange = e => {
    setState({...state, searchType: e.target.value});
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
        value={state.searchType}
      >
        <Radio value="lines">Light Microscopy</Radio>
        <Radio value="skeletons">Electron Microscopy</Radio>
      </Radio.Group>
    </div>
  );
}

SearchInput.propTypes = {
  searchTerm: PropTypes.string,
};

SearchInput.defaultProps = {
  searchTerm: "LH1046,788306724,332685751"
};
