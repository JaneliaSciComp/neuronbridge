import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import ImageWithModal from "./ImageWithModal";
import CustomMeta from "./CustomMeta";
import AlignmentMeta from "./AlignmentMeta";
import { AppContext } from "../containers/AppContext";

export default function CustomInputSummary({ searchMeta }) {
  const history = useHistory();
  const [appState, setAppState] = useContext(AppContext);

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
          <ImageWithModal
            thumbSrc={searchMeta.thumbnailURL}
            src={searchMeta.imageURL}
            title={searchMeta.upload}
          />
        </Col>
        <Col md={24} lg={12}>
          <CustomMeta metadata={searchMeta} />
        </Col>
        <Col md={24} lg={4}>
          <Button onClick={() => history.push("/upload")}>
            Back to all results
          </Button>
        </Col>
      </Row>
      {searchMeta.alignFinished ? (
        <>
          <h3>
            Alignment Parameters{" "}
            <Button
              type="ghost"
              size="small"
              onClick={handleAlignToggle}
            >
              {appState.showAlignmentMeta ? <UpOutlined /> : <DownOutlined /> }
              {appState.showAlignmentMeta ? "hide" : "expand"}
            </Button>
          </h3>
          {appState.showAlignmentMeta ? (
            <Row>
              <Col md={24} lg={24}>
                <AlignmentMeta metadata={searchMeta} />
              </Col>
            </Row>
          ) : (
            ""
          )}
        </>
      ) : null}
    </div>
  );
}

CustomInputSummary.propTypes = {
  searchMeta: PropTypes.object.isRequired
};
