import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Input } from "antd";

const { Search } = Input;

export default function SearchLines(props) {

  const [searchTerm, setSearchTerm] = useState();
  const handleSearch = value => {
    setSearchTerm(value);
  };

  if (searchTerm && searchTerm !== '') {
   return  <Redirect
      to={{
        pathname: `/search/lines/${searchTerm}`
      }}
    />
  }

  return (
    <div className="mt3">
      <h2>Search for Light Microscopy Cell Lines</h2>
      <Search
        placeholder="input search text"
        enterButton="Find Lines"
        size="large"
        defaultValue="SS02256"
        onSearch={value => handleSearch(value)}
      />
    </div>
  );
}
