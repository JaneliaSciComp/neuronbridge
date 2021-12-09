import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Tabs } from "antd";
import Summary from "./MatchModal/Summary";
import ViewIn3D from "./MatchModal/ViewIn3D";

const { TabPane } = Tabs;

export default function MatchModal(props) {
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
      <Tabs defaultActiveKey="1">
        <TabPane tab={summaryLabel} key="1">
          <Summary
            selectedMatch={selectedMatch}
            mask={mask}
            isLM={isLM}
            selected={selected}
            matchesList={matchesList}
          />
        </TabPane>
        <TabPane tab="View in 3D" key="2">
          <ViewIn3D selectedMatch={selectedMatch} mask={mask} />
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
