import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';
import Layout from '../component/Layout';
import { Provider } from 'react-redux';
import { store, persistor } from '../../store/store';
import SecondLayout from '../component/SecondLayout';
import { ThemeProvider } from 'next-themes';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const shouldRenderLayout = !['/sign-in'].includes(
    router.pathname
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                {shouldRenderLayout ? (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                ) : (
                  <SecondLayout>
                    <Component {...pageProps} />
                  </SecondLayout>
                )}
              </PersistGate>
            </Provider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
