import "../styles/globals.css";
import "../styles/mapcss.css";
import type { AppProps } from "next/app";
import Header from "../components/Header/Header";
import { useLocationStore } from "../stores/locationStore";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { setLocation } = useLocationStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      setLocation([userCoordinates[0], userCoordinates[1]]);
    });
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
