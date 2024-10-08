/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSearch = /* GraphQL */ `
  query GetSearch($id: ID!) {
    getSearch(id: $id) {
      id
      owner
      identityId
      upload
      searchDir
      searchMask
      errorMessage
      alignmentErrorMessage
      alignmentScore
      alignmentMovie
      step
      anatomicalRegion
      algorithm
      searchType
      displayableMask
      uploadThumbnail
      nTotalMatches
      updatedOn
      createdOn
      voxelX
      voxelY
      voxelZ
      referenceChannel
      alignStarted
      alignFinished
      xyShift
      maskThreshold
      dataThreshold
      mirrorMask
      pixColorFluctuation
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
        owner
        identityId
        upload
        searchDir
        searchMask
        errorMessage
        alignmentErrorMessage
        alignmentScore
        alignmentMovie
        anatomicalRegion
        cdsStarted
        cdsFinished
        step
        displayableMask
        nTotalMatches
        searchType
        uploadThumbnail
        updatedOn
        createdOn
        alignFinished
        alignStarted
        anatomicalRegion
      }
      nextToken
    }
  }
`;

export const listItemsByOwner = `
  query ListItemsByOwner(
    $identityId: ID!,
    $limit: Int,
    $nextToken: String,
    $sortDirection: String
  ) {
    listItemsByOwner(identityId: $identityId, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
      items {
        id
        owner
        identityId
        upload
        searchDir
        searchMask
        errorMessage
        alignmentErrorMessage
        alignmentScore
        alignmentMovie
        anatomicalRegion
        cdsStarted
        cdsFinished
        step
        displayableMask
        nTotalMatches
        searchType
        uploadThumbnail
        updatedOn
        createdOn
        alignFinished
        alignStarted
        anatomicalRegion

      }
      nextToken
    }
  }
`;
