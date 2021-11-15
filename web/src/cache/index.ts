import { cacheExchange } from '@urql/exchange-graphcache';

export const cache = cacheExchange({
  updates: {
    Mutation: {
      // updates for mutations goes here
    }
  }
});
