import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { AutoComplete, Input, Col, Row } from "antd";
import { Auth, API } from "aws-amplify";

import { useDebounce } from "../libs/hooksLib";
import HelpButton from "./Help/HelpButton";
import "./SearchInput.css";
import "./LoaderButton.css";

const { Search } = Input;

export default function SearchInput({ searchTerm, examples, uploads, help }) {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [dropDownOpen, setDropDownState] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm, setSearch]);

  const handleSearch = value => {
    history.push(`/search?q=${value}`);
  };

  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      Auth.currentCredentials().then(() => {
        API.get("SearchAPI", "/published_names", {
          queryStringParameters: { q: debouncedSearch, f: "start" }
        })
          .then(items => {
            const newOptions = items.names.map(item => {
              return { value: item.name, label: item.name };
            });
            setOptions(newOptions);
          })
          .catch(() => {
            setOptions([]);
          });
      });
    }
  }, [debouncedSearch]);

  const onSearch = searchText => {
    setSearch(searchText);
  };

  const exampleIds = process.env.REACT_APP_LEVEL.match(/pre$/i)
    ? ["R33C10", "SS39036", "15758", "13319", "12288"]
    : ["MB543B", "LH173", "1077847238", "1537331894"];

  const exampleLinks = exampleIds.map((id, i) => {
    const url = `/search?q=${id}`;
    return (
      <>
        {i > 0 && ", "}
        <Link to={url}>{id}</Link>
      </>
    );
  });

  return (
    <div className="searchInput">
      {examples && <p> examples: {exampleLinks} </p>}
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
