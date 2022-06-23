import "../styles/globals.css";
import "../styles/mapcss.css";
import type { AppProps } from "next/app";
import Header from "../components/Header/Header";
import { useLocationStore } from "../stores/locationStore";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider session={pageProps.session}>
      <div className="w-screen h-screen overflow-y-scroll bg-BG">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
