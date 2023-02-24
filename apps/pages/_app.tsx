import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <Footer />
      </QueryClientProvider>
    </>
  );
}
