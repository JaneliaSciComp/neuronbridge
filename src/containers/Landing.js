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
          Welcome to NeuronBridge
        </Row>
   )
}

export default Landing;