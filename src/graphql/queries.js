/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSearch = /* GraphQL */ `
  query GetSearch($id: ID!) {
    getSearch(id: $id) {
      id
      upload
      searchDir
      searchMask
      errorMessage
      step
      anatomicalRegion
      algorithm
      searchType
      displayableMask
      nTotalMatches
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
        upload
        searchDir
        searchMask
        errorMessage
				cdsStarted
				cdsFinished
        step
        displayableMask
        nTotalMatches
        searchType
        updatedOn
        createdOn
      }
      nextToken
    }
  }
`;
