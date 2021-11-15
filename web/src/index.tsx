import { render } from 'solid-js/web';
import { Suspense } from 'solid-js';
import { Router } from 'solid-app-router';
import {
  createClient,
  dedupExchange,
  fetchExchange,
  Provider
} from 'solid-urql';
import { devtoolsExchange } from '@urql/devtools';
import { cache } from './cache';
import App from './App';
import './index.css';

const client = createClient({
  url: 'http://localhost:5000/graphql',
  requestPolicy: 'cache-first',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange]
});

render(
  () => (
    <Provider value={client}>
      <Router>
        <Suspense fallback={<>Loading....</>}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
