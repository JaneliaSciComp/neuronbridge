import React, {useRef, useState, useEffect, useImperativeHandle} from "react";
import {Input} from "antd";
import { Tabs } from 'antd';
import SearchSkeletons from "./SearchSkeletons";
import SearchLines from "./SearchLines";
import { Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import EntryList2 from "./EntryList2";
import MyContext from "./MyContext";
import Matches from "./Matches";

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
  } else if (location.pathname.includes('match')) {
    defaultKey="3";
  }

return (
    <MyContext.Consumer>
        {context => (
          <div className="card-container">
            <Tabs type="card" defaultActiveKey={defaultKey} onChange={context.changeTab}>
              <TabPane tab="Published LM Lines" key="1" >
                 <SearchLines elemId={ elemId } />
              </TabPane>
              <TabPane tab="Published EM Skeletons" key="2">
                 <SearchSkeletons elemId={ elemId } />
              </TabPane>
              <TabPane tab="Matches" key="3">
                 <Matches elemId={ elemId } />
              </TabPane>
            </Tabs>
            Result<br />
            { context.result && <EntryList2 result={ context.result } /> }
            Matches<br />
            { context.matches && <Matches result={ context.matches } /> }
          </div>
        )}
    </MyContext.Consumer>
  );
}

export default SearchTabs;