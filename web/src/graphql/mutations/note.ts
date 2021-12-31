import { gql } from 'urql';
import { NOTE_FRAGMENT } from '../fragments';

export const CREATE_NOTE_MUTATION = gql`
  mutation ($title: String!, $content: String!) {
    createNote(createNoteInput: { title: $title, content: $content }) {
      ...NoteFragment
      dateAdded
      dateModified
    }
  }
  ${NOTE_FRAGMENT}
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation ($id: Int!, $title: String!, $content: String!) {
    updateNote(updateNoteInput: { id: $id, content: $content, title: $title }) {
      ...NoteFragment
      dateAdded
      dateModified
    }
  }
  ${NOTE_FRAGMENT}
`;

export const DELETE_NOTE_MUTATION = gql`
  mutation ($noteId: Int!) {
    deleteNote(noteId: $noteId)
  }
`;
