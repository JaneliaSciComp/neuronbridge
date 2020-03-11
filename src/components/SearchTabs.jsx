import React from "react";
import { Tabs } from "antd";
import SearchSkeletons from "./SearchSkeletons";
import SearchLines from "./SearchLines";
import { useLocation, useParams } from "react-router-dom";
import EntryList2 from "./EntryList2";
import MyContext from "./MyContext";
import Matches from "./Matches";

const { TabPane } = Tabs;

function SearchTabs(props) {
  let location = useLocation();
  let params = useParams();
  const { searchTerm } = params;

  let defaultKey = "1";
  if (location.pathname.includes("skeleton")) {
    defaultKey = "2";
  } else if (location.pathname.includes("match")) {
    defaultKey = "3";
  }

  return (
    <MyContext.Consumer>
      {context => (
        <div className="card-container">
          <Tabs
            type="card"
            defaultActiveKey={defaultKey}
            onChange={context.changeTab}
          >
            <TabPane tab="Published LM Lines" key="1">
              <SearchLines searchTerm={searchTerm} />
            </TabPane>
            <TabPane tab="Published EM Skeletons" key="2">
              <SearchSkeletons searchTerm={searchTerm} />
            </TabPane>
            <TabPane tab="Matches" key="3">
              <Matches />
            </TabPane>
          </Tabs>
          {context.result && <EntryList2 result={context.result} />}
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default SearchTabs;
