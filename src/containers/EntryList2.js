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
          { props.result && props.result.length > 0 ? (
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={ props.result }
              renderItem={item => (
                <List.Item
                  extra={
                    <Button onClick={context.handleClickOpen}>
                      <img
                        width={500}
                        alt="mip"
                        src={ item.image_path }
                      />
                    </Button>
                  }
                  >
                  <Skeleton avatar title={false} loading={ item.loading } active >
                    <Row>
                      <Col span={2}>
                         <GalleryDialog open={context.open} elements={ props.result } />
                      </Col>
                      <Col span={12}>
                        <List
                            itemLayout="vertical"
                            size="small"
                            dataSource={ Object.keys(item.attrs) }
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