import React, {useEffect} from "react";
import { List, Avatar, Icon, Skeleton, Col, Row} from "antd";

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

  useEffect(() => {
    console.log(props.result);
  });

  return (
      <div id='line'>
        { props.result && props.result.length > 0 ? (
          <List
            itemLayout="vertical"
            size="small"
            dataSource={ props.result }
            renderItem={item => (
              <List.Item>
                <Skeleton avatar title={false} loading={ item.loading } active >
                  <Row>
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
  )
}