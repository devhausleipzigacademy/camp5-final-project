import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import ItemDrawer from "../components/ItemDrawer/ItemDrawer";
import ItemTypeButtons from "../components/ItemTypeButtons/itemTypeButtons";
// import styles from "../styles/Home.module.css";
import Map from "../components/map";
import SearchBar from "../components/SearchBar/searchbar";
import useMap from "../hooks/useMap";

const Home: NextPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map: React.MutableRefObject<mapboxgl.Map | null> = useRef(null);
  const [zoom, setZoom] = useState(14);

  const ref = React.createRef();

  // -----creates Map ----- //
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  const { userLocation, lng, lat } = useMap(map, setZoom);
  return (
    <div className="space-y-4">
      <Header />
      <SearchBar />
      <ItemTypeButtons />
      <Map />
      <ItemDrawer ref={map} />
    </div>
  );
};

export default Home;
