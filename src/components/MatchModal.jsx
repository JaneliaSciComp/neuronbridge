import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Tabs } from "antd";
import Summary from "./MatchModal/Summary";
import ViewIn3D from "./MatchModal/ViewIn3D";

const { TabPane } = Tabs;

export default function MatchModal(props) {
  const { open, setOpen, matchesList, mask, isLM } = props;

  const [maskOpen, setMaskOpen] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(open);
  }, [open]);

  function downHandler({ key }) {
    if (/^Arrow(Left|Down)$/.test(key)) {
      setSelected(current => {
        if (current > 1) {
          return current - 1;
        }
        return current;
      });
    }
    if (/^Arrow(Right|Up)$/.test(key)) {
      setSelected(current => {
        if (current < matchesList.length) {
          return current + 1;
        }
        return current;
      });
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

  return (
    <Modal
      visible={Boolean(open)}
      onCancel={() => setOpen(0)}
      footer={[
        <Button
          key="prev"
          type="primary"
          disabled={selected <= 1}
          onClick={() =>
            setSelected(current => {
              if (current > 1) {
                return current - 1;
              }
              return current;
            })
          }
        >
          Previous
        </Button>,
        <Button
          key="next"
          type="primary"
          disabled={selected >= matchesList.length}
          onClick={() =>
            setSelected(current => {
              if (current < matchesList.length) {
                return current + 1;
              }
              return current;
            })
          }
        >
          Next
        </Button>,
        <Button key="back" type="primary" onClick={() => setOpen(0)}>
          Done
        </Button>
      ]}
      width="90%"
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Summary" key="1">
          <Summary
            selectedMatch={selectedMatch}
            mask={mask}
            isLM={isLM}
            maskOpen={maskOpen}
            selected={selected}
            matchesList={matchesList}
            setMaskOpen={setMaskOpen}
          />
        </TabPane>
        <TabPane tab="View in 3D" key="2">
          <ViewIn3D selectedMatch={selectedMatch} />
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
  isLM: PropTypes.bool.isRequired
};

MatchModal.defaultProps = {
  matchesList: [],
  mask: {}
};
