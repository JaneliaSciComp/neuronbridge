/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSearch = /* GraphQL */ `
  mutation CreateSearch($input: CreateSearchInput!) {
    createSearch(input: $input) {
      id
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
      step
    }
  }
`;
export const updateSearch = /* GraphQL */ `
  mutation UpdateSearch($input: UpdateSearchInput!) {
    updateSearch(input: $input) {
      id
      step
      upload
      searchDir
      createdOn
      updatedOn
    }
  }
`;
