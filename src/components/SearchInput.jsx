import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { AutoComplete, Input, Col, Row } from "antd";
import { Auth, API } from "aws-amplify";

import HelpButton from "./Help/HelpButton";
import "./SearchInput.css";
import "./LoaderButton.css";

const { Search } = Input;

export default function SearchInput({ searchTerm, examples, uploads, help }) {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [dropDownOpen, setDropDownState] = useState(false);

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm, setSearch]);

  const handleSearch = value => {
    history.push(`/search?q=${value}`);
  };

  const onSearch = searchText => {
    setSearch(searchText);
    Auth.currentCredentials().then(() => {
      API.get("SearchAPI", "/published_names", {
        queryStringParameters: { q: searchText, f: 'start' }
      }).then(items => {
        const newOptions = items.names.map(item => {
          return { value: item.name, label: item.name };
        });
        setOptions(newOptions);
      }).catch(() => {
        setOptions([]);
      });
    });
  };

  return (
    <div className="searchInput">
      {examples && (
        <p>
          examples: <Link to="/search?q=MB543B">MB543B</Link>,{" "}
          <Link to="/search?q=LH173">LH173</Link>,{" "}
          <Link to="/search?q=1077847238">1077847238</Link>,{" "}
          <Link to="/search?q=1537331894">1537331894</Link>
        </p>
      )}
      <Row>
        <Col xs={23}>
          <AutoComplete
            style={{ width: "100%" }}
            options={options}
            onSearch={onSearch}
            value={search}
            onSelect={handleSearch}
            onDropdownVisibleChange={open => setDropDownState(open)}
          >
            <Search
              placeholder="Search with a line name or skeleton id."
              enterButton="Search"
              onSearch={handleSearch}
              aria-label="Search"
              size="large"
              onPressEnter={e => {
                if (!dropDownOpen) {
                  handleSearch(search);
                  e.preventDefault();
                }
              }}
            />
          </AutoComplete>
        </Col>
        {help && (
          <Col xs={1} style={{ paddingLeft: "1em" }}>
            <HelpButton target="SearchInput" />
          </Col>
        )}
      </Row>
      {uploads && (
        <p>
          Or <Link to="/upload">upload an image</Link> of your own to perform a
          custom search of our data sets.
        </p>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  searchTerm: PropTypes.string,
  examples: PropTypes.bool,
  uploads: PropTypes.bool,
  help: PropTypes.bool
};

SearchInput.defaultProps = {
  searchTerm: "",
  examples: true,
  uploads: true,
  help: true
};
