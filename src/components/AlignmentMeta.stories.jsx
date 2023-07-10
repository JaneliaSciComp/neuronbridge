import React from "react";
import AlignmentMeta from "./AlignmentMeta";

export default {
  title: 'AlignmentMeta',
  component: AlignmentMeta,
};

const Template = (args) => <AlignmentMeta {...args} />;

export const ModifiedParameters = Template.bind({});

ModifiedParameters.args = {
  metadata: {
    anatomicalRegion: "vnc",
    algorithm: "avg",
    referenceChannel: 1,
    voxelX: 5,
    voxelY: 5,
    voxelZ: 2
  }
};

export const AllDefaults = Template.bind({});

AllDefaults.args = {
  metadata: {
    anatomicalRegion: "brain",
    algorithm: null,
    referenceChannel: null,
    voxelX: null,
    voxelY: null,
    voxelZ: null
  }
};
