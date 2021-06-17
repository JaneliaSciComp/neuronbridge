import React, { useState, useEffect } from "react";
import { Button, Alert } from "antd";
import { Auth, API } from "aws-amplify";

export default function DataMigration() {
  const [needsMigration, setMigrationStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Auth.currentCredentials().then(() => {
      API.get("SearchAPI", "/migration_check", {}).then(result => {
        if (result.migrate) {
          setMigrationStatus(true);
        }
      });
    });
  }, []);

  const handleMigration = () => {
    setLoading(true);
    Auth.currentCredentials().then(currentCreds => {
      API.post("SearchAPI", "/migrate_data", {
        body: {
          identityId: currentCreds.identityId
        }
      }).then(() => {
        setLoading(false);
        window.location.reload(false);
      });
    });
  };

  if (needsMigration) {
    return (
      <Alert
        type="info"
        showIcon
        style={{marginBottom: "1em"}}
        message="You have some searches that were performed with an old version of the site. If you would like to migrate them, please click on the data migration button."
        action={
          <Button type="primary" onClick={handleMigration} loading={loading}>
            Migrate Data
          </Button>
        }
      />
    );
  }
  return "";
}
