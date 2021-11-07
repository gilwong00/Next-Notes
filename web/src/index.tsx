import { render } from 'solid-js/web';
import { Suspense } from 'solid-js';
import {
  createClient,
  dedupExchange,
  fetchExchange,
  Provider
} from 'solid-urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';
import App from './App';
import './index.css';

const client = createClient({
  url: 'http://localhost:5000/graphql',
  requestPolicy: 'cache-first',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          // mutation updates here
        }
      }
    }),
    fetchExchange
  ]
});

render(
  () => (
    <Provider value={client}>
      <Suspense fallback={<>Loading....</>}>
        <App />
      </Suspense>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
