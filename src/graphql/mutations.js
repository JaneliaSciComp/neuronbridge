/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSearch = /* GraphQL */ `
  mutation CreateSearch($input: CreateSearchInput!) {
    createSearch(input: $input) {
      id
      owner
      identityId
      upload
      searchDir
      step
      createdOn
      updatedOn
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
      searchDir
      createdOn
      updatedOn
    }
  }
`;
