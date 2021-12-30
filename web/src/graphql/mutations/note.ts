import { gql } from 'urql';

export const CREATE_NOTE_MUTATION = gql`
  mutation ($title: String!, $content: String!) {
    createNote(createNoteInput: { title: $title, content: $content }) {
      id
      content
      title
      createdBy
      dateAdded
      dateModified
    }
  }
`;
