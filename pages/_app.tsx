import "../styles/globals.css";
import type { AppProps } from "next/app";
import MapComponent from "../components/Map";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MapComponent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
