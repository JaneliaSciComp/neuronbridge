import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Modal, Button, Tabs } from "antd";
import Summary from "./MatchModal/Summary";
import Download3D from "./MatchModal/Download3D";
import Citations from "./MatchModal/Citations";

const { TabPane } = Tabs;

export default function MatchModal(props) {
  const location = useLocation();
  const { page } = useParams();
  const history = useHistory();
  const { open, setOpen, matchesList, mask, isLM, searchType } = props;

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(open);
  }, [open]);

  function downHandler({ key }) {
    if (/^Arrow(Left|Down)$/.test(key)) {
      const previous = open > 1 ? open - 1 : open;
      setOpen(previous);
    }
    if (/^Arrow(Right|Up)$/.test(key)) {
      const next = open < matchesList.length ? open + 1 : open;
      setOpen(next);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  });

  const selectedMatch = matchesList[selected - 1];

  if (!selectedMatch) {
    return null;
  }

  const summaryLabel = searchType === "ppp" ? "PPPM Summary" : "CDM Summary";

  const handleTabChange = (key) => {
    let updatedPath = `${location.pathname}/${key}`;
    if (location.pathname.match(/\/(cite|download|summary)$/)) {
      updatedPath = location.pathname.replace(/[^/]*$/, key);
    }
    location.pathname = updatedPath;
    history.push(location);
  }

  return (
    <Modal
      visible={Boolean(open)}
      onCancel={() => setOpen()}
      footer={[
        <Button
          key="prev"
          type="primary"
          disabled={selected <= 1}
          onClick={() => {
            const previous = open > 1 ? open - 1 : open;
            setOpen(previous);
          }}
        >
          Previous
        </Button>,
        <Button
          key="next"
          type="primary"
          disabled={selected >= matchesList.length}
          onClick={() => {
            const next = open < matchesList.length ? open + 1 : open;
            setOpen(next);
          }}
        >
          Next
        </Button>,
        <Button key="back" type="primary" onClick={() => setOpen()}>
          Done
        </Button>
      ]}
      width="90%"
    >
      <Tabs activeKey={ page|| "summary" } onChange={handleTabChange}>
        <TabPane tab={summaryLabel} key="summary">
          <Summary
            selectedMatch={selectedMatch}
            mask={mask}
            isLM={isLM}
            selected={selected}
            matchesList={matchesList}
          />
        </TabPane>
        <TabPane tab="Download 3D Files" key="download">
          <Download3D selectedMatch={selectedMatch} mask={mask} isLM={isLM} />
        </TabPane>
        <TabPane tab="Cite this Match" key="cite">
          <Citations match={selectedMatch} mask={mask}
            matchRank={selected}
            matchesTotal={matchesList.length}
        />
        </TabPane>
      </Tabs>
    </Modal>
  );
}

MatchModal.propTypes = {
  open: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  matchesList: PropTypes.arrayOf(PropTypes.object),
  mask: PropTypes.object,
  isLM: PropTypes.bool.isRequired,
  searchType: PropTypes.string.isRequired
};

MatchModal.defaultProps = {
  matchesList: [],
  mask: {}
};
