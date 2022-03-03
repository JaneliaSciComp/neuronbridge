/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSearch = /* GraphQL */ `
  mutation CreateSearch($input: CreateSearchInput!) {
    createSearch(input: $input) {
      id
      owner
      identityId
      channel
      upload
      uploadThumbnail
      searchDir
      searchMask
      searchType
      step
      createdOn
      updatedOn
      anatomicalRegion
      referenceChannel
    }
  }
`;
export const deleteSearch = /* GraphQL */ `
  mutation DeleteSearch($input: DeleteSearchInput!) {
    deleteSearch(input: $input) {
      id
      identityId
      owner
      step
    }
  }
`;
export const updateSearch = /* GraphQL */ `
  mutation UpdateSearch($input: UpdateSearchInput!) {
    updateSearch(input: $input) {
      id
      identityId
      owner
      step
      upload
      uploadThumbnail
      searchDir
      searchType
      searchMask
      createdOn
      updatedOn
      anatomicalRegion
    }
  }
`;
