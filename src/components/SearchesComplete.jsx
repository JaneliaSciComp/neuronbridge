import React from "react";
import PropTypes from "prop-types";
import { Tooltip, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatRelative } from "date-fns";
import { Link } from "react-router-dom";
import { deleteSearch } from "../libs/awsLib";

export default function SearchesComplete({ searches }) {
  const searchesComplete = searches
    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
    .map(search => {
      const searchLink = `/results/${search.id}`;
      return (
        <li key={search.id}>
          <Link to={searchLink}>{search.upload} </Link> -{" "}
          {formatRelative(new Date(search.createdOn), new Date())}{" "}
          <Tooltip title="Delete">
            <Button
              danger
              size="small"
              shape="circle"
              onClick={() => deleteSearch(search)}
              icon={<CloseOutlined />}
            />
          </Tooltip>
        </li>
      );
    });

  if (searchesComplete.length === 0) {
    return (
      <div>
        <p>
          You don&apos;t have any completed searches. Please wait for you in
          progress searches to complete or start a new search by uploading an
          image above.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul>{searchesComplete}</ul>
    </div>
  );
}

SearchesComplete.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.object).isRequired
};
