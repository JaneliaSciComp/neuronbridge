import React, {useRef, useState, useEffect, useImperativeHandle} from "react";
import {Input} from "antd";
import { Tabs } from 'antd';
import SearchSkeletons from "./SearchSkeletons";
import SearchLines from "./SearchLines";
import { Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import EntryList2 from "./EntryList2";
import MyContext from "./MyContext";

function SearchTabs(props) {
  let location = useLocation();
  let params = useParams();
  let history = useHistory();
  const { TabPane } = Tabs;
  const { Search } = Input;

  let defaultKey = "1";

  let elemId = params.elemId;
  if (!elemId) {
    elemId = null;
  }

  if (location.pathname.includes('skeleton')) {
    defaultKey="2";
  }

return (
    <MyContext.Consumer>
        {context => (
          <div className="card-container">
            <Tabs type="card" defaultActiveKey={defaultKey}>
              <TabPane tab="Published LM Lines" key="1" >
                 <SearchLines elemId={ elemId } />
              </TabPane>
              <TabPane tab="Published EM Skeletons" key="2">
                 <SearchSkeletons elemId={ elemId } />
              </TabPane>
              {/*<TabPane tab="Upload Search Mask" key="3" >*/}
              {/*</TabPane>*/}
            </Tabs>
            <EntryList2 result={ context.result } />
          </div>
        )}
    </MyContext.Consumer>
  );
}

export default SearchTabs;