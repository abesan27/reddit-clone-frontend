import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apolloClient';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
