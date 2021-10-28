import React from "react";
import PropTypes from "prop-types";
import { Button, Popconfirm, message } from "antd";
import { Auth, API } from "aws-amplify";

export default function AnnouncementsDelete({id}) {

  function handleConfirm() {
    Auth.currentCredentials().then(() => {
      API.del("SearchAPI", `/announcements/${id}`, {})
        .then(() => {
          message.success(`deleted message ${id}`);
        }).catch((error) => {
          message.error(error.message);
        });
    });

  }

  return (
    <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={handleConfirm}>
      <Button>Delete</Button>
    </Popconfirm>
  );
}

AnnouncementsDelete.propTypes = {
  id: PropTypes.string.isRequired
}
