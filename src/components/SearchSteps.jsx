import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["Files Uploaded", "Alignment", "Search", "Complete"];
}

export default function SearchSteps() {
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const activeStep = Math.floor(Math.random() * steps.length);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => {
          const error = Boolean(Math.random() > 0.5);
          return (
            <Step key={label}>
              <StepLabel error={error}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
