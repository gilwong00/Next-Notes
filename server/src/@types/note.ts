import { Note } from 'src/note/models/note.model';

export type NoteResponse = Omit<
  Note,
  'created_by' | 'date_added' | 'date_modified'
>;
