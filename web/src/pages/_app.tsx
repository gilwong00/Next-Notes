import type { AppProps } from 'next/app';
import { Provider } from 'urql';
import { client, ssrCache } from '../graphql';
import { User } from '../@types';
import { GlobalStyle } from '../components';
import { ThemeProvider } from 'styled-components';

interface Props extends AppProps {
  user: User;
  error: Error;
}

const theme = {
  color: {
    primary: '#06b534',
    altPrimary: '#129134',
    white: '#fff',
    black: '#000',
    midnight: '#444',
    whitesmoke: '#f9f3f3'
  }
};

function MyApp({ Component, pageProps }: Props) {
  if (pageProps.urqlState) ssrCache.restoreData(pageProps.urqlState);

  return (
    <Provider value={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
