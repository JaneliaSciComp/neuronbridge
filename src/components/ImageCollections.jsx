import React, { useContext, useEffect, useState } from "react";
import { Typography, Table, message } from "antd";
import { Auth, Storage } from "aws-amplify";
import { AppContext } from "../containers/AppContext";
import { libraryFormatter } from "../libs/utils";

const { Title, Paragraph } = Typography;

export default function ImageCollections() {
  const { appState } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [refs, setRefs] = useState(null);

  useEffect(() => {
    const storageOptions = {
      customPrefix: {
        public: "",
      },
      level: "public",
      download: true,
    };

    function getReferences() {
      setLoading(true);
      const refsPath = `${appState.dataVersion}/references.json`;

      Auth.currentCredentials()
        .then(() => {
          Storage.get(refsPath, storageOptions)
            .then((response) => {
              const fr = new FileReader();
              fr.onload = (evt) => {
                const json = JSON.parse(evt.target.result);
                setRefs(json);
                setLoading(false);
              };
              fr.readAsText(response.Body);
            })
            .catch((e) => {
              if (e.response && e.response.status === 404) {
                message.error({
                  duration: 0,
                  content: "No references were found",
                  key: "refnotfound",
                  onClick: () => message.destroy("refnotfound"),
                });
              } else {
                message.error({
                  duration: 0,
                  content: "Unable to load references from the server",
                  key: "matchloaderror",
                  onClick: () => message.destroy("matchloaderror"),
                });
              }
              setLoading(false);
            });
        })
        .catch(() => {
          message.error({
            duration: 0,
            content: "Unable to load references from the server",
            key: "matchgenericerror",
            onClick: () => message.destroy("matchgenericerror"),
          });
          setLoading(false);
        });
    }

    if (appState?.dataConfig?.loaded) {
      getReferences();
    }
  }, [appState.dataConfig]);

  if (!appState.dataConfig || !appState.dataConfig.stores || isLoading) {
    return <div>Loading...</div>;
  }

  const tableData = [];

  if (appState.dataConfig.stores && refs) {
    Object.keys(appState.dataConfig.stores).forEach((store) => {
      const storeData = appState.dataConfig.stores[store];
      if (storeData.customSearch) {
        const { customSearch } = storeData;

        ["emLibraries", "lmLibraries"].forEach((libraryType) => {
          customSearch[libraryType].forEach((library) => {
            const libraryTypeCollection =
              refs.stores[store].customSearch[libraryType];
            const libraryCollection = libraryTypeCollection.filter(
              (lib) => lib.name === library.name,
            )[0];
            if (!libraryCollection) {
              return;
            }
            libraryCollection.releases.forEach((release) => {
              const [releaseName, releaseData] = Object.entries(release)[0];
              tableData.push({
                collection: libraryFormatter(library.name),
                area: storeData.anatomicalArea,
                count: releaseData.count,
                release: releaseName,
                dois: releaseData.dois,
              });
            });
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
      title: "Anatomical Area",
      dataIndex: "area",
      key: "area",
      sorter: (a, b) =>
        a.area.localeCompare(b.area, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
    },
    {
      title: "Release",
      dataIndex: "release",
      key: "release",
      sorter: (a, b) =>
        a.release.localeCompare(b.release, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
    },
    {
      title: "DOIs",
      dataIndex: "dois",
      key: "dois",
      render: (dois) => {
        // convert dois to list
        const doisList = [];
        Object.entries(dois).forEach(([id, refName]) => {
          doisList.push({ id, refName });
        });

        doisList.sort((a, b) => a.refName.localeCompare(b.refName));

        return (
          <ul>
            {doisList.map((doi) => {
              const {id, refName} = doi;
              return (
                <li key={id}>
                  <a href={`https://doi.org/${id}`}>{refName}</a>
                </li>
              );
            })}
          </ul>
        );
      },
    },
    {
      title: "Searched Image Count",
      dataIndex: "count",
      key: "count",
      render: (count) => count.toLocaleString(),
      sorter: (a, b) => a.count - b.count,
    },
  ];

  /* eslint-disable react/no-unstable-nested-components */
  return (
    <div>
      <Title>Image Collections</Title>
      <Paragraph>
        Each image collection is a set of images grouped together based on one
        or more publications.
      </Paragraph>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ defaultPageSize: 100 }}
        summary={(pageData) => {
          let total = 0;
          pageData.forEach(({ count }) => {
            total += count;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell />
              <Table.Summary.Cell />
              <Table.Summary.Cell />
              <Table.Summary.Cell>{total.toLocaleString()}</Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
}
