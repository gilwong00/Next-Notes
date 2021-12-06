import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'urql';
import { client, ssrCache } from '../graphql';
import { AppProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.urqlState) ssrCache.restoreData(pageProps.urqlState);

  return (
    <Provider value={client}>
      <AppProvider>
        <Component {...pageProps} />;
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
