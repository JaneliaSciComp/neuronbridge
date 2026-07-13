import React, { useContext, useEffect, useState } from "react";
import { Typography, Table, Select, message } from "antd";
import { Auth, Storage } from "aws-amplify";
import { faExternalLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../containers/AppContext";
import { libraryFormatter } from "../libs/utils";

const { Title, Paragraph } = Typography;

// Brief, human-readable descriptions for each image collection, keyed by the
// raw library name used in the data (references.json / config.json).
// NOTE: these are draft descriptions and should be reviewed/edited by the
// scientific advisors (e.g. Geoffrey) before they are considered final.
const COLLECTION_DESCRIPTIONS = {
  "FlyEM_Hemibrain_v1.2.1":
    "A dense electron microscopy (EM) connectome covering the central brain of a female Drosophila, reconstructed by Janelia's FlyEM team. Neurons can be looked up and matched against light microscopy driver lines.",
  "FlyEM_MANC_v1.2.1":
    "The Male Adult Nerve Cord (MANC) EM connectome, a complete reconstruction of the ventral nerve cord of a male Drosophila.",
  "FlyEM_Male_CNS_Brain_v0.9":
    "The brain portion of the male central nervous system (Male CNS) EM reconstruction, part of an effort to reconstruct a complete adult Drosophila nervous system.",
  "FlyEM_Male_CNS_VNC_v0.9":
    "The ventral nerve cord portion of the male central nervous system (Male CNS) EM reconstruction, part of an effort to reconstruct a complete adult Drosophila nervous system.",
  FlyLight_Annotator_Gen1_MCFO:
    "Expert-annotated MultiColor FlpOut (MCFO) light microscopy images of FlyLight Gen1 GAL4 driver lines, with curated neuron annotations.",
  "FlyLight_Annotator_Gen1_MCFO_v1.1":
    "Expert-annotated MultiColor FlpOut (MCFO) light microscopy images of FlyLight Gen1 GAL4 driver lines, with curated neuron annotations.",
  FlyLight_Gen1_MCFO:
    "MultiColor FlpOut (MCFO) stochastic-labeling light microscopy images of the FlyLight Gen1 GAL4 driver line collection.",
  "FlyLight_Gen1_MCFO_v1.1":
    "MultiColor FlpOut (MCFO) stochastic-labeling light microscopy images of the FlyLight Gen1 GAL4 driver line collection.",
  "FlyLight_Split-GAL4_Drivers":
    "Curated Split-GAL4 driver lines from published studies, each targeting specific cell types. Individual releases correspond to the publications that generated or used those lines.",
  "FlyLight_Split-GAL4_Omnibus_Broad":
    "A broad screening collection of Split-GAL4 driver lines aggregated across many FlyLight studies.",
  FlyWire_BANC_v626:
    "The Brain-And-Nerve-Cord (BANC) EM connectome from the FlyWire project, spanning both the brain and ventral nerve cord of an adult Drosophila.",
  FlyWire_FAFB_v783_realign:
    "The Full Adult Fly Brain (FAFB) EM connectome, proofread by the FlyWire community and realigned for NeuronBridge color depth matching.",
};

export default function ImageCollections() {
  const { appState } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [refs, setRefs] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

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
          Storage.get(refsPath, {
            ...storageOptions,
            cacheControl: 'no-cache, no-store, must-revalidate',
          })
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

  // Group the release rows by collection (library). Each collection keeps its
  // raw library name (used as a stable key and to look up descriptions) and a
  // formatted display name.
  const collectionsByName = {};

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
              if (releaseData.count > 0) {
                if (!collectionsByName[library.name]) {
                  collectionsByName[library.name] = {
                    libraryName: library.name,
                    displayName: libraryFormatter(library.name),
                    releaseRows: [],
                  };
                }
                collectionsByName[library.name].releaseRows.push({
                  key: `${store}-${releaseName}`,
                  area: storeData.anatomicalArea,
                  count: releaseData.count,
                  release: releaseName,
                  dois: releaseData.dois,
                });
              }
            });
          });
        });
      }
    });
  }

  // Build the sorted list of collection options for the dropdown.
  const collectionOptions = Object.values(collectionsByName)
    .map((collection) => ({
      value: collection.libraryName,
      label: collection.displayName,
    }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );

  // Default to the first collection until the user picks one.
  const activeCollectionName =
    selectedCollection && collectionsByName[selectedCollection]
      ? selectedCollection
      : collectionOptions[0]?.value;

  const activeCollection = activeCollectionName
    ? collectionsByName[activeCollectionName]
    : null;

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

  const activeDescription = activeCollection
    ? COLLECTION_DESCRIPTIONS[activeCollection.libraryName]
    : null;

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
          value={activeCollectionName}
          options={collectionOptions}
          onChange={(value) => setSelectedCollection(value)}
          style={{ minWidth: 320 }}
          showSearch
          optionFilterProp="label"
          placeholder="Select a collection"
        />
      </Paragraph>
      {activeCollection ? (
        <>
          <Title level={2}>{activeCollection.displayName}</Title>
          {activeDescription ? (
            <Paragraph>{activeDescription}</Paragraph>
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
