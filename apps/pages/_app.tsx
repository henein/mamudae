import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Announce from "../src/components/Announce";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Announce />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
