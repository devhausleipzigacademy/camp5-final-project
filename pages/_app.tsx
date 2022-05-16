import "../styles/globals.css";
import type { AppProps } from "next/app";
import FilterButtons from "../components/FilterButtons";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FilterButtons />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
