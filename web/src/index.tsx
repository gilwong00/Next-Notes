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
import { whoamiQuery } from './graphql/queries/whoami';
import { User } from './@types';
import { setUser } from './stores';
import App from './App';

const client = createClient({
  url: 'http://localhost:5000/graphql',
  requestPolicy: 'cache-first',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange]
});

Promise.resolve()
  .then(() => {
    return new Promise(async resolve => {
      const { data } = await client.query<User>(whoamiQuery).toPromise();
      // set user in store if exists
      if (data?.id) setUser(data);
      return resolve(data);
    });
  })
  .then(() => {
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
  });
