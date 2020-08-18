import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export default function MaskSelection() {
  return (
    <div>
      <p>Mask selection page</p>
      <p>List each of the generated mips per channel</p>
      <p>
        Show mask selection canvas and allow user to select mask and upload it
      </p>
      <p>
        Once mask is uploaded, redirect back to the searches page to show
        progress.
      </p>
      <Text type="danger">This page should redirect to the search progress page if the search step is &gt; 2, ie the search is in progress or already complete.</Text>
    </div>
  );
}
