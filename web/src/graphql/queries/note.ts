import { gql } from '@urql/core';

export const GET_USER_NOTES_QUERY = gql`
  query {
    getUserNotes {
      id
      title
      content
      createdBy
      dateAdded
      dateModified
    }
  }
`;
