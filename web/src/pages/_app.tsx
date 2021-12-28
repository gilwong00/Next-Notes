import type { AppProps } from 'next/app';
import { Provider } from 'urql';
import { client, ssrCache } from '../graphql';
import { User } from '../@types';
import { GlobalStyle } from '../components';

interface Props extends AppProps {
  user: User;
  error: Error;
}

function MyApp({ Component, pageProps }: Props) {
  if (pageProps.urqlState) ssrCache.restoreData(pageProps.urqlState);

  return (
    <Provider value={client}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
