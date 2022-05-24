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
import { getMapData } from "../utils/getMapData";
import { MapData, ListData, Feature } from "../utils/types";
import { getListData } from "../utils/getListData";
import Button from "../components/Button/Button";
import FilterButtons from "../components/FilterButtons/filterButtons";
import { Spinner } from "../components/Spinner/Spinner";
import { getFreeItems } from "../utils/getFreeItems";
import { getSwapItems } from "../utils/getSwapItems";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Home: NextPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [mapData, setMapData] = useState<MapData | null>(null);

  async function getAllMapData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
  }

  useEffect(() => {
    getAllMapData();
  }, []);

  const filterMarkers = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!mapData) {
      console.log("no mapData");
      return;
    } else if ((event.target as HTMLButtonElement).value === "Free") {
      const filteredMarkersArr: Feature[] = mapData?.features.filter(
        (feature) => feature.type === "FREE"
      );
      const updatedMapData: MapData = {
        ...mapData,
        features: filteredMarkersArr,
      };
      console.log("did i gethere?");
      setMapData(updatedMapData);
    } else {
      console.log("or did i get here?");
      const filteredMarkersArr: Feature[] = mapData?.features.filter(
        (feature) => feature.type === "SWAP"
      );
      const updatedMapData: MapData = {
        ...mapData,
        features: filteredMarkersArr,
      };
      setMapData(updatedMapData);
    }
  };

  return (
    <div className="pt-16 space-y-2">
      <Header />
      <SearchBar />
      <FilterButtons clickHandler={filterMarkers} />
      {!mapData ? <Spinner /> : <Map mapData={mapData} />}
      <ItemDrawer />
    </div>
  );
};

export default Home;
