import React, {useEffect} from "react";
import { List, Avatar, Icon, Skeleton, Col, Row} from "antd";
import GalleryDialog from "./GalleryDialog";
import MyContext from "./MyContext";
import Button from '@material-ui/core/Button';
import "./EntryList2.css";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    { text }
  </span>
);

export default function EntryList2(props) {

  const [open, setOpen] = React.useState(false);
  const [searchType, setSearchType] = React.useState(props.searchType);
  const [selectedValue, setSelectedValue] = React.useState(props.result);

  let keys = [];
  const testId = '2711777429277376523';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Update the document title using the browser API

  });

  if (searchType == 'skeleton') {
    keys = ['Body Id', 'Library']
  }
  else {
    keys = ['Line', 'Slide Code'];
  }

  return (
      <MyContext.Consumer>
        {context => (
          <div>
          { context.result && context.result.length > 0 ? (
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={ selectedValue }
              renderItem={item => (
                <List.Item
                  extra={
                    <Button onClick={context.handleClickOpen}>
                      <img
                        width={500}
                        alt="mip"
                        src={ item.thumbnail_path }
                      />
                    </Button>
                  }
                  >
                  <Skeleton avatar title={false} loading={ item.loading } active >
                    <Row>
                      <Col span={2}>
                         <GalleryDialog open={context.open} elements={ context.result } />
                      </Col>
                      <Col span={12}>
                        <List
                            itemLayout="vertical"
                            size="small"
                            dataSource={ ['Line','Slide Code'] }
                            renderItem={ subItem => (
                              <List.Item>
                                <Skeleton loading={item.loading} active>
                                  <div>
                                    <strong>{subItem}: </strong>{item.attrs[subItem]}
                                  </div>
                                </Skeleton>
                              </List.Item>
                            )}
                        />
                        </Col>
                    </Row>
                  </Skeleton>
                </List.Item>
            )}
            />) : (
            <div><br/>
               No data available</div>
            )}
          </div>
        )}
      </MyContext.Consumer>
  )
}