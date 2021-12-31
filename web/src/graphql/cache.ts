import { cacheExchange } from '@urql/exchange-graphcache';
import { GET_USER_NOTES_QUERY, WHO_AM_I } from '.';
import { INote } from '../@types';

export const cache = cacheExchange({
  updates: {
    Mutation: {
      createNote: (_result, args, cache) => {
        cache.updateQuery({ query: GET_USER_NOTES_QUERY }, data => {
          data.getUserNotes.unshift(_result.createNote);
          return data;
        });
      },
      updateNote: (_result, args, cache) => {
        cache.updateQuery({ query: GET_USER_NOTES_QUERY }, data => {
          const index = data.getUserNotes.findIndex(
            (note: INote) => note.id === (_result.updateNote as INote)?.id
          );

          if (index) data.getUserNotes[index] = _result.updateNote;
          return data;
        });
      },
      deleteNote: (_result, args, cache) => {
        cache.updateQuery({ query: GET_USER_NOTES_QUERY }, data => {
          data.getUserNotes = data.getUserNotes.filter(
            (note: INote) => note.id !== _result.deleteNote
          );
          return data;
        });
      },
      login: (_result, args, cache) => {
        cache.updateQuery({ query: WHO_AM_I }, data => {
          if (!data) {
            return {
              whoami: _result.login
            };
          }
        });
      },
      logout: (_result, args, cache) => {
        cache.updateQuery({ query: GET_USER_NOTES_QUERY }, data => {
          data.getUserNotes = [];
          return data;
        });
      }
    }
  }
});
