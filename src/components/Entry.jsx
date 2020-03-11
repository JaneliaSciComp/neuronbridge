import {Button, Input} from "antd";
import React, {useEffect, useState} from "react";
import { Col, Row} from "antd";

export default function Entry(props) {
  const { Search } = Input;
  const [key, setKey] = useState("test");

  useEffect(() => {
    // Update the document title using the browser API
    console.log(props.image_url);
    console.log(props.search);
  });


  let attributes = [];
    Object.keys(props.attrs).forEach(function(key) {
      attributes.push(
          <Row>
            <strong>{key}:</strong> { props.attrs[key] }
          </Row>
      );
    });

  let result = null;

  if (props.search == "line"){
    result = <div>
          <Row>
            <Col>Test</Col>
            <Col span={8}><img src={props.image_url} /></Col>
            <Col span={8}>
              {attributes}
            </Col>
            <Col span={8}>
              <Button className="mr3" type="default"> View EM Matches</Button>
            </Col>
          </Row>
          <hr />
        </div>
  }
  else {
    result = <div>
          <Row>
            <Col>Test</Col>
            <Col span={8}><img src={props.image_url} /></Col>
            <Col span={8}>
              {attributes}
            </Col>
            <Col span={8}>
              <Button className="mr3" type="default"> View EM Matches</Button>
            </Col>
          </Row>
          <hr />
        </div>
  }

  return (
      {result}
     )
}