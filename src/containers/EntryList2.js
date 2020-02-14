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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let keys = [];
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
              dataSource={ context.result }
              renderItem={item => (
                <List.Item
                  extra={
                    <Button onClick={context.handleClickOpen}>
                      <img
                        width={500}
                        alt="mip"
                        src={ 'https://janelia-flylight-color-depth.s3.amazonaws.com/JRC2018_Unisex_20x_HR/FlyLight+Split-GAL4+Drivers/SS37295-20170502_32_D4-m-20x-brain-JRC2018_Unisex_20x_HR-color_depth_1.png' }
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