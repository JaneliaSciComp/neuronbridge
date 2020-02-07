// Landing.jsx
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { Button, DatePicker, version, Row, Layout } from "antd";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

function Landing() {
    const [searchType, setSearchType] = useState(0);

    return (
        <Row>
          <Link to="/search/lines">
            <Button className="mr3" type="default" onClick={() => setSearchType('new')}>New Search</Button>
          </Link>
          <Link to="/about">
            <Button className="mr3" type="default">About</Button>
          </Link>
        </Row>
   )
}

export default Landing;