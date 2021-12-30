import { cacheExchange } from '@urql/exchange-graphcache';
import { GET_USER_NOTES_QUERY } from '.';

export const cache = cacheExchange({
  updates: {
    Mutation: {
      createNote: (_result, args, cache) => {
        cache.updateQuery({ query: GET_USER_NOTES_QUERY }, data => {
          data.getUserNotes.unshift(_result.createNote);
          return data;
        });
      }
    }
  }
});
