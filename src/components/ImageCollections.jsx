import React, { useContext, useEffect, useState } from "react";
import { Typography, Table, Select, message } from "antd";
import { Auth, Storage } from "aws-amplify";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../containers/AppContext";
import { libraryFormatter } from "../libs/utils";
import "./ImageCollections.css";

const { Title, Paragraph } = Typography;

export default function ImageCollections() {
  const { appState } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [refs, setRefs] = useState(null);
  const [collectionsConfig, setCollectionsConfig] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    const storageOptions = {
      customPrefix: {
        public: "",
      },
      level: "public",
      download: true,
      cacheControl: "no-cache, no-store, must-revalidate",
    };

    // Fetch a JSON file from the data bucket and parse it.
    function getJson(path) {
      return Storage.get(path, storageOptions).then(
        (response) =>
          new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = (evt) => {
              try {
                resolve(JSON.parse(evt.target.result));
              } catch (err) {
                reject(err);
              }
            };
            fr.onerror = () => reject(fr.error);
            fr.readAsText(response.Body);
          }),
      );
    }

    function loadData() {
      setLoading(true);
      const refsPath = `${appState.dataVersion}/references.json`;
      const collectionsPath = `${appState.dataVersion}/collections.json`;

      Auth.currentCredentials()
        .then(() =>
          Promise.all([
            getJson(refsPath),
            // collections.json is optional: if it is missing we fall back to
            // showing one collection per library (see buildCollectionDefs).
            getJson(collectionsPath).catch(() => null),
          ]),
        )
        .then(([refsJson, collectionsJson]) => {
          setRefs(refsJson);
          setCollectionsConfig(collectionsJson);
          setLoading(false);
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
    }

    if (appState?.dataConfig?.loaded) {
      loadData();
    }
  }, [appState.dataConfig]);

  if (!appState.dataConfig || !appState.dataConfig.stores || isLoading) {
    return <div>Loading...</div>;
  }

  // Build a map of library name -> release rows, pulling counts/DOIs from
  // references.json and the anatomical area from the data config.
  const releaseRowsByLibrary = {};

  if (refs && refs.stores) {
    Object.keys(refs.stores).forEach((store) => {
      const storeConfig = appState.dataConfig.stores[store];
      const area = storeConfig ? storeConfig.anatomicalArea : "";
      const customSearch = refs.stores[store].customSearch;
      if (!customSearch) {
        return;
      }
      ["emLibraries", "lmLibraries"].forEach((libraryType) => {
        (customSearch[libraryType] || []).forEach((library) => {
          library.releases.forEach((release) => {
            const [releaseName, releaseData] = Object.entries(release)[0];
            if (releaseData.count > 0) {
              if (!releaseRowsByLibrary[library.name]) {
                releaseRowsByLibrary[library.name] = [];
              }
              releaseRowsByLibrary[library.name].push({
                key: `${store}-${releaseName}`,
                area,
                count: releaseData.count,
                release: releaseName,
                dois: releaseData.dois,
              });
            }
          });
        });
      });
    });
  }

  // The collection definitions come from collections.json. When it is not
  // available we fall back to one collection per library so the page still
  // works (this is the pre-collections.json behaviour).
  function buildCollectionDefs() {
    if (collectionsConfig && Array.isArray(collectionsConfig.collections)) {
      return collectionsConfig.collections;
    }
    return Object.keys(releaseRowsByLibrary).map((libraryName) => ({
      name: libraryFormatter(libraryName),
      libraries: [libraryName],
      description: null,
    }));
  }

  // Resolve each collection to its release rows, keeping only collections that
  // actually have searchable images. Definition order is preserved so the
  // dropdown matches the order collections.json lists them in.
  const collections = buildCollectionDefs()
    .map((def) => ({
      name: def.name,
      type: def.type || null,
      description: def.description || null,
      releaseRows: (def.libraries || []).flatMap(
        (libraryName) => releaseRowsByLibrary[libraryName] || [],
      ),
    }))
    .filter((collection) => collection.releaseRows.length > 0);

  // Render a dropdown option showing the collection name (in bold) above its
  // description, so users see what each collection contains without having to
  // parse the name first. `label` is the plain name, used for the selected
  // value display (via optionLabelProp) and for search filtering.
  const renderCollectionOption = (collection) => (
    <Select.Option
      key={collection.name}
      value={collection.name}
      label={collection.name}
    >
      <div className="collection-option">
        <span className="collection-option-name">{collection.name}</span>
        {collection.description ? (
          <span className="collection-option-description">
            {collection.description}
          </span>
        ) : null}
      </div>
    </Select.Option>
  );

  // Group the collections by type (e.g. Light Microscopy / Electron
  // Microscopy) when a type is provided, otherwise show a flat list.
  const hasTypes = collections.some((collection) => collection.type);
  const collectionGroups = [];
  if (hasTypes) {
    collections.forEach((collection) => {
      const groupLabel = collection.type || "Other";
      let group = collectionGroups.find((entry) => entry.label === groupLabel);
      if (!group) {
        group = { label: groupLabel, items: [] };
        collectionGroups.push(group);
      }
      group.items.push(collection);
    });
  }

  // Default to the first collection until the user picks one.
  const activeCollection =
    collections.find((collection) => collection.name === selectedCollection) ||
    collections[0] ||
    null;

  const releaseColumns = [
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
      defaultSortOrder: "ascend",
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

        // Sort DOIs by publication year (newest first)
        // Extract the 4-digit year from the end of each reference name
        doisList.sort((a, b) => {
          const yearA = parseInt(a.refName.slice(-4), 10);
          const yearB = parseInt(b.refName.slice(-4), 10);
          // Sort in descending order (yearB - yearA)
          return yearB - yearA;
        });

        return doisList.map((doi, index) => {
          const { id, refName } = doi;
          return (
            <span key={id}>
              <a href={`https://doi.org/${id}`} target="_blank" rel="noopener noreferrer">{refName} <FontAwesomeIcon icon={faExternalLink} size="xs" /></a>
              {index < doisList.length - 1 ? ', ' : ''}
            </span>
          );
        });
      },
    },
    {
      title: "Searchable Image Count",
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
        NeuronBridge provides curated image collections with precomputed matches
        and tools for custom search. Each collection groups images linked to one
        or more publications. Select a collection below to see its releases and
        the publications associated with it.
      </Paragraph>
      <Paragraph>
        <label htmlFor="collection-select" style={{ marginRight: 8, fontWeight: 600 }}>
          Collection:
        </label>
        <Select
          id="collection-select"
          value={activeCollection ? activeCollection.name : undefined}
          onChange={(value) => setSelectedCollection(value)}
          style={{ width: 460, maxWidth: "100%" }}
          listHeight={560}
          virtual={false}
          popupClassName="collection-select-dropdown"
          showSearch
          optionFilterProp="label"
          optionLabelProp="label"
          placeholder="Select a collection"
        >
          {hasTypes
            ? collectionGroups.map((group) => (
                <Select.OptGroup key={group.label} label={group.label}>
                  {group.items.map((collection) =>
                    renderCollectionOption(collection),
                  )}
                </Select.OptGroup>
              ))
            : collections.map((collection) =>
                renderCollectionOption(collection),
              )}
        </Select>
      </Paragraph>
      {activeCollection ? (
        <>
          <Title level={2}>{activeCollection.name}</Title>
          {activeCollection.description ? (
            <Paragraph>{activeCollection.description}</Paragraph>
          ) : null}
          <Table
            columns={releaseColumns}
            dataSource={activeCollection.releaseRows}
            pagination={{ defaultPageSize: 100, hideOnSinglePage: true }}
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
                  <Table.Summary.Cell>{total.toLocaleString()}</Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </>
      ) : (
        <Paragraph>No image collections are available.</Paragraph>
      )}
    </div>
  );
}
