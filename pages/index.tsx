import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import ItemDrawer from "../components/ItemDrawer/ItemDrawer";
import ItemTypeButtons from "../components/ItemTypeButtons/itemTypeButtons";
import ListingItem from "../components/ListingItem/ListingItem";
import styles from "../styles/Home.module.css";
import Map from "../components/map";
import SearchBar from "../components/SearchBar/searchbar";
import { Feature } from "../utils/types";
import { MapData, ListData } from "../utils/types";
import { getMapData } from "../utils/getMapData";
import { getListData } from "../utils/getListData";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Home: NextPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [listData, setListData] = useState<ListData | null>(null);

  async function getData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
    const listDataFetch = await getListData();
    setListData(listDataFetch);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="space-y-4">
      <Header />
      <SearchBar />
      <ItemTypeButtons />
      <div className={styles.container}>
        {mapData && <Map mapData={mapData} />}
      </div>
      <ItemDrawer />
    </div>
  );
};

export default Home;
