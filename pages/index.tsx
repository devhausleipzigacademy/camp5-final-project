import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import ItemDrawer from "../components/ItemDrawer/ItemDrawer";
import ItemTypeButtons from "../components/ItemTypeButtons/itemTypeButtons";
import ListingItem from "../components/ListingItem/ListingItem";
import Map from "../components/map";
import SearchBar from "../components/SearchBar/searchbar";
import { Feature } from "../utils/types";
import { MapData, ListData } from "../utils/types";
import { getMapData } from "../utils/getMapData";
import { getListData } from "../utils/getListData";
import { Spinner } from "../components/Spinner/Spinner";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Home: NextPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [mapData, setMapData] = useState<MapData | null>(null);

  async function getData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pt-16 space-y-2">
      <Header />
      <SearchBar />
      <ItemTypeButtons />
      {!mapData ? <Spinner /> : <Map mapData={mapData} />}
      <ItemDrawer />
    </div>
  );
};

export default Home;
