import React, { useContext } from "react";
import { Typography, Table } from "antd";
import { AppContext } from "../containers/AppContext";
import { libraryFormatter } from "../libs/utils";

const { Title, Paragraph } = Typography;

export default function ImageCollections() {
  const { appState } = useContext(AppContext);

  if (!appState.dataConfig || !appState.dataConfig.stores) {
    return <div>Loading...</div>;
  }

  const tableData = [];

  if (appState.dataConfig.stores) {
    console.log(appState.dataConfig.stores);
    Object.keys(appState.dataConfig.stores).forEach((store) => {
      const storeData = appState.dataConfig.stores[store];
      if (storeData.customSearch) {
        const { customSearch } = storeData;
        customSearch.emLibraries.forEach((emLibrary) => {
          tableData.push({
            collection: libraryFormatter(emLibrary.name),
            area: storeData.anatomicalArea,
            count: emLibrary.count,
          });
        });
        customSearch.lmLibraries.forEach((lmLibrary) => {
          tableData.push({
            collection: libraryFormatter(lmLibrary.name),
            area: storeData.anatomicalArea,
            count: lmLibrary.count,
          });
        });
      }
    });
  }

  const columns = [
    {
      title: "Collection",
      dataIndex: "collection",
      key: "collection",
      defaultSortOrder: "ascend",
      // Sort by collection
      sorter: (a, b) =>
        a.collection.localeCompare(b.collection, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
    },
    {
      title: "Annatomical Area",
      dataIndex: "area",
      key: "area",
      sorter: (a, b) =>
        a.area.localeCompare(b.area, undefined, {
          numeric: true,
          sensitivity: "base",
        }),

    },
    {
      title: "Searched Image Count",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
  ];

  /* eslint-disable react/no-unstable-nested-components */
  return (
    <div>
      <Title>Image Collections</Title>
      <Paragraph>Each image collection is a set of images grouped together based on one or more publications.</Paragraph>
      <Table columns={columns} dataSource={tableData} summary={
        (pageData) => {
          let total = 0;
          pageData.forEach(({ count }) => {
            total += count;
          });
          return (
              <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell />
                <Table.Summary.Cell>{total}</Table.Summary.Cell>
              </Table.Summary.Row>
          );
        }
      }

        />
    </div>
  );
}
