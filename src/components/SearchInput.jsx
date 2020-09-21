import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Input, Col, Row } from "antd";

import HelpButton from "./HelpButton";
import "./SearchInput.css";
import "./LoaderButton.css";

const { Search } = Input;

export default function SearchInput({ searchTerm, examples, uploads, help }) {
  const history = useHistory();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm, setSearch]);

  const handleSearch = value => {
    history.push(`/search?q=${value}`);
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
          <Search
            placeholder="Search with a line name or skeleton id."
            enterButton="Search"
            aria-label="Search"
            size="large"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSearch={value => handleSearch(value)}
          />
        </Col>
        {help && (
          <Col xs={1} style={{ paddingLeft: "1em" }}>
            <HelpButton target="SearchInput" />
          </Col>
        )}
      </Row>
      {uploads && (
        <p>
          Or <Link to="/upload">upload an image</Link> of your own to
          perform a custom search of our data sets.
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
