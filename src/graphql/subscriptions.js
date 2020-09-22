/* eslint-disable */
// this is an auto generated file. This will be overwritten

// Had to remove id and status variables to allow subscription
// to show events for all searches. If present but not specified
// the null value would not match any searches,
export const onCreateSearch = /* GraphQL */ `
  subscription OnCreateSearch($identityId: String) {
    onCreateSearch(identityId: $identityId) {
      id
      upload
      identityId
      searchDir
      searchMask
      searchType
      errorMessage
      displayableMask
      nTotalMatches
      step
      updatedOn
      createdOn
    }
  }
`;
export const onDeleteSearch = /* GraphQL */ `
  subscription OnDeleteSearch($identityId: String) {
    onDeleteSearch(identityId: $identityId) {
      id
      identityId
    }
  }
`;

export const onUpdateSearch = /* GraphQL */ `
  subscription OnUpdateSearch($identityId: String) {
    onUpdateSearch(identityId: $identityId) {
      id
      upload
      identityId
      searchDir
      searchType
      searchMask
			cdsStarted
			cdsFinished
      errorMessage
      displayableMask
      nTotalMatches
      step
      updatedOn
      createdOn
    }
  }
`;

// The original queries has the ($id: ID, $step: Int) parameters. If these
// are present, then the subscription doesn't work unless they are provided.
// Without them we can subscribe to all updates without the need to provide
// an id or step.
export const onUpdateSearchOriginal = /* GraphQL */ `
  subscription OnUpdateSearch($id: ID, $step: Int) {
    onUpdateSearch(id: $id, step: $step) {
      id
      step
    }
  }
`;


