import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row} from "antd";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import GalleryCarousel from "./GalleryCarousel";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Gallery from "./Gallery";
import CarouselElement from "./CarouselElement";
import EntryList3 from "./EntryList3";
import MyContext from "./MyContext";

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
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GalleryDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useEffect = () => {
    console.log('Gallery Dialog: ' + props.open);
  };

  const tags = props.elements.map(x => (
      <div id={"div_" + x.id}>
        <Row id={"row_" + x.id} className="ml5" >
          <Col span={18} >
            <img src={x.image_path} alt="image" />
          </Col>
          <Col span={5} className="ml5" >
            <EntryList3 listType="line" result={ [x] } elemId={ x.attrs.Line } />
          </Col>
        </Row>
        {/*<Row id="button">*/}
        {/*  <Col span={12}>*/}
        {/*    <Button variant="outlined" color="primary" onClick={handleClickOpen}>View Details*/}
        {/*    </Button>*/}
        {/*  </Col>*/}
        {/*  <Col>*/}
        {/*    <Button variant="outlined" color="primary" onClick={handleClickOpen}>Mask*/}
        {/*    </Button>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
  ));

  // <CarouselElement content={x} />

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
                <Typography variant="h6" className={classes.title}>
                </Typography>
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