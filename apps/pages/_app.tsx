import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../src/component/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useState(() => new QueryClient())[0];
  const router = useRouter();
  const shouldRenderLayout = !["/login", "/signUp"].includes(router.pathname);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {shouldRenderLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
