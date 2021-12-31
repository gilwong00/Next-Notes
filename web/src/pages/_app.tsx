import type { AppProps } from 'next/app';
import Router from 'next/router';
import { Provider } from 'urql';
import { client, ssrCache } from '../graphql';
import { User } from '../@types';
import { GlobalStyle } from '../components';
import { ThemeProvider } from 'styled-components';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
