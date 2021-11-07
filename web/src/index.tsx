import { render } from 'solid-js/web';
import { Suspense } from 'solid-js';
import { createClient, Provider } from 'solid-urql';
import App from './App';
import './index.css';

const client = createClient({
  url: 'http://localhost:5000/graphql'
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
