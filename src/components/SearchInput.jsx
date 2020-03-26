import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Input, Radio } from "antd";
import "./SearchInput.css";
import "./LoaderButton.css";
import { AppContext } from "../containers/AppContext";

const { Search } = Input;

export default function SearchInput(props) {
  const { searchTerm } = props;
  const history = useHistory();
  const [state, setState] = useContext(AppContext);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchTerm);
  },[searchTerm, setSearch]);


  const handleSearch = value => {
    history.push(`/search/${state.searchType}/${value}`);
  };

  const onChange = e => {
    setState({ ...state, searchType: e.target.value });
  };

  return (
    <div className="searchInput">
      <p>
        examples: <Link to="/search/lines/LH1046">LH1046</Link>,{" "}
        <Link to="/search/skeletons/332685751">332685751</Link>,{" "}
        <Link to="/search/skeletons/788306724">788306724</Link>
      </p>
      <Search
        placeholder="Search with a line name or skeleton id."
        enterButton="Search"
        size="large"
        value={search}
        onChange={e => setSearch(e.target.value)}
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
  searchTerm: PropTypes.string
};

SearchInput.defaultProps = {
  searchTerm: ""
};
