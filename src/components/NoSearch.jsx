import React, { useContext } from "react";
import { Typography } from "antd";
import { AppContext } from "../containers/AppContext";

const { Title, Text } = Typography;

export default function NoSearch() {
  const [state] = useContext(AppContext);

  const helpMessage = (state.searchType === 'lines') ? (
    <Text>You can search for lines on the <a href="http://splitgal4.janelia.org">Split-GAL4</a> website.</Text>
  ) : (
    <Text>You can search for body ids on the <a href="https://neuprint.janelia.org">neuPrint</a> website.</Text>
  );

  return (
    <>
    <Title>Not sure what to search for?</Title>
    {helpMessage}
    </>
  );
}
