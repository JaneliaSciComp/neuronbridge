/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSearch = /* GraphQL */ `
  query GetSearch($id: ID!) {
    getSearch(id: $id) {
      id
      step
      updatedOn
      createdOn
    }
  }
`;
export const listSearches = /* GraphQL */ `
  query ListSearches(
    $filter: TableSearchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSearches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        step
        updatedOn
        createdOn
      }
      nextToken
    }
  }
`;
