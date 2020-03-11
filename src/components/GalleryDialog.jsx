import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Row, Col} from "antd";
import GalleryCarousel from "./GalleryCarousel"
import MyContext from "../containers/MyContext"
import EntryList3 from "./EntryList3";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GalleryDialog(props) {
  const classes = useStyles();
  const { elements } = props;

  const tags = elements.map(x => (
      <div id={`div_${x.id}`}>
        <Row id={`row_${x.id}`} className="ml5" >
          <Col span={18} >
            <img src={x.image_path} alt="EM data"  />
          </Col>
          <Col span={5} className="ml5" >
            <EntryList3 listType="line" result={ [x] } elemId={ x.attrs.Line } />
          </Col>
        </Row>
      </div>
  ));

  return (
    <MyContext.Consumer>
      {context => (
        <div>
          <Dialog fullScreen open={context.open} onClose={context.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={context.handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Button autoFocus color="inherit" onClick={context.handleClose}>
                  Save
                </Button>
              </Toolbar>
            </AppBar>
            <GalleryCarousel>
              {tags}
            </GalleryCarousel>
          </Dialog>
        </div>
      )}
    </ MyContext.Consumer>
  );
}

GalleryDialog.propTypes = {
  elements: PropTypes.object.isRequired
};
