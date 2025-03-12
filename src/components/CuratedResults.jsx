import PropTypes from "prop-types";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;

const columns = [
  {
    title: "Line Name",
    dataIndex: "name",
    key: "name",
    render: (name) => <Link to={`/search?q=${name}`}>{name}</Link>,
  },
  {
    title: "Confidence",
    dataIndex: "confidence",
    key: "confidence",
  },
  {
    title: "Anatomical Region",
    dataIndex: "anatomicalRegion",
    key: "anatomicalRegion",
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Cell Type / Neuron ID",
    dataIndex: "matched",
    key: "matched",
    // if the match is a cell type, then we add a wildcard to the search
    // to get all the sub cell types.
    render: (matched, row) => <Link to={`/search?q=${matched}${row.addWildard}`}>{matched}</Link>,
  },
];

export default function CuratedResults({ results, loadError }) {
  // if we didn't find anything, then don't display anything.
  if (results.length === 0) {
    return null;
  }

  let pagination = {
    position: ["bottomLeft"],
    pageSizeOptions: ["2", "5", "10", "15", "20"],
    defaultPageSize: 2,
    showSizeChanger: true,
    showQuickJumper: true
  };

  if (results.length < 3) {
    pagination = false;
  }

  if (loadError) {
    return (
      <>
        <Paragraph type="danger">
          There was a problem retrieving the curated matches.
        </Paragraph>
        <Paragraph>Reloading the page may resolve the issue.</Paragraph>
        <Paragraph>
          If this problem persists, please contact us at{" "}
          <a href="mailto:neuronbridge@janelia.hhmi.org">
            neuronbridge@janelia.hhmi.org
          </a>
          . Please provide the search term used and any other relevant details.
        </Paragraph>
      </>
    );
  }

  return (
    <Table columns={columns} dataSource={results} pagination={pagination} />
  );
}

CuratedResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadError: PropTypes.bool.isRequired,
};
