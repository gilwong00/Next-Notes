import { gql } from '@urql/core';

export const GET_USER_NOTES_QUERY = gql`
  query ($orderBy: String!) {
    getUserNotes(orderBy: $orderBy) {
      id
      title
      content
      createdBy
      dateAdded
      dateModified
    }
  }
`;
