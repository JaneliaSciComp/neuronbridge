import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import CustomMeta from "./CustomMeta";
import { AppContext } from "../containers/AppContext";

export default function CustomInputSummary({ searchMeta, children }) {
  const history = useHistory();
  const { appState, setAppState } = useContext(AppContext);

  const handleAlignToggle = () => {
    setAppState({
      ...appState,
      showAlignmentMeta: !appState.showAlignmentMeta
    });
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <h3>Input Mask</h3>
      <Row>
        <Col xs={24} lg={8}>
          {children[0]}
        </Col>
        <Col md={24} lg={12}>
          <CustomMeta metadata={searchMeta} />
          {searchMeta.alignFinished ? (
            <>
              <h3>
                Alignment Parameters{" "}
                <Button type="ghost" size="small" onClick={handleAlignToggle}>
                  {appState.showAlignmentMeta ? (
                    <UpOutlined />
                  ) : (
                    <DownOutlined />
                  )}
                  {appState.showAlignmentMeta ? "hide" : "expand"}
                </Button>
              </h3>
              {appState.showAlignmentMeta ? (
                <Row>
                  <Col md={24} lg={24}>
                    {children[1]}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </>
          ) : null}
        </Col>
        <Col md={24} lg={4}>
          <Button onClick={() => history.push("/upload")}>
            Back to all results
          </Button>
        </Col>
      </Row>
    </div>
  );
}

CustomInputSummary.propTypes = {
  searchMeta: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};
