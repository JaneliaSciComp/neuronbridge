import React from "react";
import PropTypes from "prop-types";
import { Button, List, Skeleton, Col, Row } from "antd";
import GalleryDialog from "./GalleryDialog";
import MyContext from "../containers/MyContext";
import "./EntryList2.css";
import config from "../config";

export default function EntryList2(props) {
  const { searchType } = props;
  const [, setMatches] = React.useState(null);

  const getCorrMatches = event => {
    const bodyId = event.currentTarget.value;

    if (bodyId) {
      const path = `${config.MATCH_PATH}${bodyId}.json`;
      fetch(path)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          setMatches(json.results);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  let buttonText = "View EM Matches";
  if (searchType === "skeleton") {
    buttonText = "View LM Matches";
  }

  return (
    <MyContext.Consumer>
      {context => (
        <div>
          {context.result && context.result.length > 0 ? (
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3
              }}
              dataSource={context.result}
              renderItem={item => (
                <List.Item
                  extra={
                    <div>
                      <Button onClick={context.handleClickOpen}>
                        <img width={500} alt="mip" src={item.thumbnail_path} />
                      </Button>
                      <Button
                        value={item.id}
                        className="mr3"
                        type="default"
                        onClick={value => getCorrMatches(value)}
                      >
                        {buttonText}
                      </Button>
                    </div>
                  }
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <Row>
                      <Col span={2}>
                        <GalleryDialog
                          open={context.open}
                          elements={context.result}
                        />
                      </Col>
                      <Col span={12}>
                        <List
                          itemLayout="vertical"
                          size="small"
                          dataSource={Object.keys(item.attrs)}
                          renderItem={subItem => (
                            <List.Item>
                              <Skeleton loading={item.loading} active>
                                <div>
                                  <strong>{subItem}: </strong>
                                  {item.attrs[subItem]}
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
            <div>
              <br />
              No data available
            </div>
          )}
        </div>
      )}
    </MyContext.Consumer>
  );
}

EntryList2.propTypes = {
  searchType: PropTypes.string.isRequired
};
