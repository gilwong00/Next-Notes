export interface SearchResult<T> {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: T;
}
// {
// 	id: 2,
// 	title: 'new note for date',
// 	content: 'date test',
// 	createdBy: 'c9766a3c-d665-41f4-a9a1-f536ff79b435'
// }
