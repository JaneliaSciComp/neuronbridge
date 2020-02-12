import React, {useEffect} from "react";
import { List, Avatar, Icon, Skeleton, Col, Row} from "antd";
import Entry from "./Entry";
import GalleryDialog from "./GalleryDialog";
import MyContext from "./MyContext";
import Button from '@material-ui/core/Button';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    { text }
  </span>
);

export default function EntryList2(props) {

  const [open, setOpen] = React.useState(true);
  const [searchType, setSearchType] = React.useState('line');
  const [selectedValue, setSelectedValue] = React.useState(props.result);

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
      <MyContext.Consumer>
        {context => (
          <div>
            {context.test}
          </div>
        )}
      </MyContext.Consumer>
  )
}