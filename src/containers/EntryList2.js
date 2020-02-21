import React, {useEffect} from "react";
import { List, Avatar, Icon, Skeleton, Col, Row} from "antd";
import GalleryDialog from "./GalleryDialog";
import MyContext from "./MyContext";
import { Button } from "antd";
import "./EntryList2.css";
import config from "../config";
import Matches from "./Matches";

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
  const [matches, setMatches] = React.useState(null);

  const getCorrMatches = (event) => {
      let that = this; // bind this to that
      const bodyId = event.currentTarget.value;

      if (bodyId) {
        const path = config.MATCH_PATH + bodyId + '.json';
        fetch(path)
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            const matches = json['results'];
            setMatches(matches);
          }).catch(function(error) {
            console.log(error);
          });
      }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let keys = [];
  let buttonText = 'View EM Matches';
  if (searchType == 'skeleton') {
    keys = ['Body Id', 'Library']
    buttonText = 'View LM Matches';
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
                      <div>
                        <Button onClick={context.handleClickOpen}>
                          <img
                            width={500}
                            alt="mip"
                            src={ item.thumbnail_path }
                          />
                        </Button><br/><br/>
                        <Button value={item.id} className="mr3" type="default" onClick={value => getCorrMatches(value)}>{buttonText}</Button>
                      </div>
                    }>
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
            />
            ) : (
            <div><br/>
               No data available</div>
            )}
          </div>
        )}
      </MyContext.Consumer>
  )
}