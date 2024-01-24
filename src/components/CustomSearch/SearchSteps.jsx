import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
// import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import MaskSelectionStep from "./MaskSelectionStep";
import FileUploadStep from "./FileUploadStep";
import ImageAlignmentStep from "./ImageAlignmentStep";
import ColorDepthSearchStep from "./ColorDepthSearchStep";
import CompleteStep from "./CompleteStep";
import "./SearchSteps.css";

function stepState(step, current, error) {
  if (step === current && error) {
    return "error";
  }
  if (step === current) {
    return "active";
  }
  if (step > current) {
    return "pending";
  }
  // step < current
  return "complete";
}

export default function SearchSteps({ search }) {
  const { errorMessage, alignmentErrorMessage } = search;
  const searchLink = `/results/${search.id}`;
  // there are 5 steps in the process stored in the database, but we
  // only display 3 in this component, so need this replaces 2 of them
  // with the step that we want to show.
  let currentStep = search.step;
  if (search.step === 4 && search.cdsFinished) {
    currentStep = 5;
  }

  return (
    <div className="searchSteps">
      <Row>
        <Col xs={5}>
          <FileUploadStep
            currentStep={currentStep}
            state={stepState(0, currentStep, errorMessage)}
            date={search.createdOn}
            alignStarted={Boolean(search?.alignStarted)}
            upload={search?.upload}
          />
        </Col>
        <Col xs={5}>
          <ImageAlignmentStep
            state={stepState(
              1,
              currentStep,
              alignmentErrorMessage || errorMessage
            )}
            search={search}
          />
        </Col>
        <Col xs={5}>
          <MaskSelectionStep
            search={search}
            state={stepState(2, currentStep, errorMessage)}
          />
        </Col>
        <Col xs={5}>
          <ColorDepthSearchStep
            started={search.cdsStarted}
            finished={search.cdsFinished}
            state={stepState(3, currentStep, errorMessage)}
          />
        </Col>
        <Col xs={4}>
          <CompleteStep
            resultsUrl={searchLink}
            matches={search.nTotalMatches}
            state={stepState(4, currentStep, errorMessage)}
            errorMessage={errorMessage}
          />
        </Col>
      </Row>
    </div>
  );
}

SearchSteps.propTypes = {
  search: PropTypes.object.isRequired
};
