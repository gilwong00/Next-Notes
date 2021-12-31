import { gql } from '@urql/core';
import { NOTE_FRAGMENT } from '../fragments';

export const GET_USER_NOTES_QUERY = gql`
  query {
    getUserNotes {
      ...NoteFragment
      dateAdded
      dateModified
    }
  }
  ${NOTE_FRAGMENT}
`;

export const SEARCH_NOTES = gql`
  query ($searchText: String!) {
    searchNotes(searchText: $searchText) {
      ...NoteFragment
    }
  }
  ${NOTE_FRAGMENT}
`;
