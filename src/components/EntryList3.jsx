import React from "react";
import PropTypes from "prop-types";
import { List, Skeleton, Col, Row} from "antd";

export default function EntryList3(props) {

  const { result } = props;

  return (
      <div id='line'>
        { result && result.length() > 0 ? (
          <List
            itemLayout="vertical"
            size="small"
            dataSource={ result }
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

EntryList3.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired
};
