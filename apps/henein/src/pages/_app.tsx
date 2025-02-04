import { persistor, store } from '../../store/store';
import '../../styles/globals.css';
import SecondLayout from '../component/SecondLayout';
import { MamudaeLayout } from '@henein/components';
import { Analytics } from '@vercel/analytics/next';
import 'material-symbols';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const shouldRenderLayout = !['/sign-in'].includes(router.pathname);

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
        <Analytics />
      </QueryClientProvider>
    </>
  );
}
