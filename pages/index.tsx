import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import ItemDrawer from "../components/ItemDrawer/ItemDrawer";
import Map from "../components/map";
import SearchBar from "../components/SearchBar/searchbar";
import { getMapData } from "../utils/getMapData";
import { MapData, ListData, Feature } from "../utils/types";
import FilterButtons from "../components/FilterButtons/filterButtons";
import { Spinner } from "../components/Spinner/Spinner";
import addMarkers from "../utils/addMarkers";
import { useMapStore } from "../stores/mapStore";
import { useLocationStore } from "../stores/locationStore";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Home: NextPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [initialMapData, setInitialMapData] = useState<MapData | null>(null);
  const { location } = useLocationStore();
  const { mapRef } = useMapStore();
  const [isActive, setIsActive] = useState<boolean>(false);

  async function getAllMapData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
    setInitialMapData(mapDataFetch);
  }

  useEffect(() => {
    getAllMapData();
  }, []);

  const filterMarkers = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!initialMapData) {
      return;
    } else if ((event.target as HTMLButtonElement).value === "Free") {
      const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
        (feature) => feature.type === "FREE"
      );
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      console.log(updatedMapData);
      setMapData(updatedMapData);
      console.log("MapDataNew", mapData);
      addMarkers(location, mapRef, mapData as MapData);
      console.log(mapRef, location);
      setIsActive((prev) => !prev);
    } else {
      const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
        (feature) => feature.type === "SWAP"
      );
      const updatedMapData: MapData = {
        ...initialMapData,
        features: filteredMarkersArr,
      };
      console.log(updatedMapData);
      setMapData(updatedMapData);
      console.log("MapDataNew", mapData);
      addMarkers(location, mapRef, mapData as MapData);
      console.log(mapRef, location);
      setIsActive((prev) => !prev);
    }
  };

  return (
    <div className="pt-16 space-y-2">
      <Header />
      <SearchBar />
      <FilterButtons clickHandler={filterMarkers} isActive={isActive} />
      {!mapData ? <Spinner /> : <Map mapData={mapData} />}
      <ItemDrawer />
    </div>
  );
};

export default Home;
