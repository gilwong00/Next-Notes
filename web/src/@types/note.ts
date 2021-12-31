export interface INote {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  dateAdded: number;
  dateModified: number;
}

export type NoteOrderBy = 'DESC' | 'ASC';
