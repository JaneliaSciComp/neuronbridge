/* eslint-disable */
// this is an auto generated file. This will be overwritten

// Had to remove id and status variables to allow subscription
// to show events for all searches. If present but not specified
// the null value would not match any searches,
export const onCreateSearch = /* GraphQL */ `
  subscription OnCreateSearch {
    onCreateSearch {
      id
      status
      updatedOn
      createdOn
    }
  }
`;
export const onDeleteSearch = /* GraphQL */ `
  subscription OnDeleteSearch {
    onDeleteSearch {
      id
    }
  }
`;

export const onUpdateSearchOriginal = /* GraphQL */ `
  subscription OnUpdateSearch($id: ID, $status: String) {
    onUpdateSearch(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const onUpdateSearch = /* GraphQL */ `
  subscription OnUpdateSearch {
    onUpdateSearch {
      id
      status
      updatedOn
      createdOn
    }
  }
`;


export const onSearchChange = /* GraphQL */ `
  subscription OnSearchChange {
    onCreateSearch {
      id
      status
      updatedOn
      createdOn
    },
    onDeleteSearch {
      id
      status
    },
    onUpdateSearch {
      id
      status
      updatedOn
      createdOn
    }
  }
`;
