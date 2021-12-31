import { NoteResponse } from 'src/@types';
import { Note } from 'src/note/models/note.model';

export const mapNoteToResponse = (note: Note): NoteResponse => {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    createdBy: note?.createdBy ?? note.created_by,
    dateAdded: note.date_added,
    dateModified: note.date_modified
  };
};
