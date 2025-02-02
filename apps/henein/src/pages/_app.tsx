import 'material-symbols';
import '../../styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { MamudaeLayout } from '@henein/components';

import { persistor, store } from '../../store/store';
import SecondLayout from '../component/SecondLayout';

import type { AppProps } from 'next/app';
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
                  <MamudaeLayout>
                    <Component {...pageProps} />
                  </MamudaeLayout>
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
