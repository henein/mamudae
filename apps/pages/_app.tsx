import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Layout from "../src/components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {router.pathname === "/login" || router.pathname === "/signUp" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
