import React from "react";
import { MemoryRouter } from "react-router";
import AlignmentMeta from "./AlignmentMeta";

export default {
  title: "AlignmentMeta",
  component: AlignmentMeta,
};

function Template(args) {
  return (
    <MemoryRouter>
      <AlignmentMeta {...args} />
    </MemoryRouter>
  );
}

export const ModifiedParameters = Template.bind({});

ModifiedParameters.args = {
  metadata: {
    anatomicalRegion: "vnc",
    algorithm: "avg",
    referenceChannel: 1,
    voxelX: 5,
    voxelY: 5,
    voxelZ: 2,
  },
};

export const AllDefaults = Template.bind({});

AllDefaults.args = {
  metadata: {
    anatomicalRegion: "brain",
    algorithm: null,
    referenceChannel: null,
    voxelX: null,
    voxelY: null,
    voxelZ: null,
  },
};
