import React, {useEffect} from "react";
import { List, Avatar, Icon, Skeleton, Col, Row} from "antd";
import Button from '@material-ui/core/Button';
import config from "../config";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    { text }
  </span>
);

export default function Matches(props) {

  const [open, setOpen] = React.useState(false);
  const [searchType, setSearchType] = React.useState(props.searchType);
  const [matches, setMatches] = React.useState(props.result);

  let keys = [];
  const testId = '2711777429277376523';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (searchType == 'skeleton') {
    keys = ['Body Id', 'Library']
  }
  else {
    keys = ['Line', 'Slide Code'];
  }

  const getMatches = (event) => {
      if (testId) {
        const path = config.MATCH_PATH + testId + '.json';
        fetch(path)
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            const matches = json['results'];
            setMatches(matches)
          }).catch(function(error) {
            console.log(error);
          });
      }
  };

  useEffect(() => {
    getMatches();
  });

  return (
          <div>
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 20,
              }}
              dataSource={ matches }
              renderItem={ item => (
                  <List.Item
                    extra={
                        <Button >
                          <img
                            width={500}
                            alt="mip"
                            src={ item.thumbnail_path }
                          />
                        </Button>
                    }>
                    <Skeleton loading={item.loading}>
                    <Row>
                      <Col>
                        <List
                            itemLayout="vertical"
                            size="small"
                            dataSource={ Object.keys(item.attrs) }
                            renderItem={ subItem => (
                              <List.Item>
                                <Skeleton loading={item.loading} active>
                                  <Row>
                                    <Col>
                                      <strong>{subItem}: </strong>{item[subItem]}
                                    </Col>
                                  </Row>
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
          </div>)
}