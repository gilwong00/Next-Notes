import { gql } from '@urql/core';

export const NOTE_FRAGMENT = gql`
  fragment NoteFragment on Note {
    id
    title
    content
    createdBy
  }
`;
