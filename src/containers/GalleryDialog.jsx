import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import GalleryCarousel from "./GalleryCarousel"
import MyContext from "./MyContext"

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
  const [open, setOpen] = React.useState(props.open);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const useEffect = () => {
    console.log('Props Elements: ' + props.elements);
  };

  // const tags = props.elements.map(x => (
  //     <div id={"div_" + x.id}>
  //       <Row id={"row_" + x.id} className="ml5" >
  //         <Col span={18} >
  //           <img src='https://janelia-flylight-color-depth.s3.amazonaws.com/JRC2018_Unisex_20x_HR/FlyLight+Split-GAL4+Drivers/SS37295-20170502_32_D4-m-20x-brain-JRC2018_Unisex_20x_HR-color_depth_1.png' alt="image" />
  //         </Col>
  //         <Col span={5} className="ml5" >
  //           <EntryList3 listType="line" result={ [x] } elemId={ x.attrs.Line } />
  //         </Col>
  //       </Row>
  //     </div>
  // ));

  const tags = [<div>Eins</div>,<div>Zwo</div>]

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