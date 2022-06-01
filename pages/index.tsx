import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import ItemDrawer from "../components/ItemDrawer/ItemDrawer";
import Map from "../components/map";
import SearchBar from "../components/SearchBar/searchbar";
import { getMapData } from "../utils/getMapData";
import { MapData, Feature } from "../utils/types";
import { Spinner } from "../components/Spinner/Spinner";
import addMarkers from "../utils/addMarkers";
import { useMapStore } from "../stores/mapStore";
import { useLocationStore } from "../stores/locationStore";
import { useMarkerStore } from "../stores/markerStore";
import Button from "../components/Button/Button";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Home: NextPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [initialMapData, setInitialMapData] = useState<MapData | null>(null);
  const { location } = useLocationStore();
  const { mapRef } = useMapStore();
  const [selectedFilter, setSelectedFilter] =
    useState<"" | "Free" | "Swap">("");

  async function getAllMapData() {
    const mapDataFetch = await getMapData();
    setMapData(mapDataFetch);
    setInitialMapData(mapDataFetch);
  }

  useEffect(() => {
    getAllMapData();
  }, []);

  const { marker } = useMarkerStore();

  function resetAndSetMarkers(updatedMapData: MapData) {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();
    marker?.forEach((m) => m.remove());
    const markerElements = document.getElementsByClassName("marker");
    while (markerElements.length > 0) {
      markerElements[0].remove();
    }
    addMarkers(location, mapRef, updatedMapData as MapData);
  }

  const filterMarkers = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!initialMapData) {
      return;
    } else if ((event.target as HTMLButtonElement).value === "Free") {
      if (selectedFilter === "Free") {
        setSelectedFilter("");
        setMapData(initialMapData);
        resetAndSetMarkers(initialMapData);
      } else {
        const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
          (feature) => feature.type === "FREE"
        );
        setSelectedFilter("Free");
        const updatedMapData: MapData = {
          ...initialMapData,
          features: filteredMarkersArr,
        };
        setMapData(() => updatedMapData);
        resetAndSetMarkers(updatedMapData);
      }
      console.log(mapRef, location);
    } else {
      if (selectedFilter === "Swap") {
        setSelectedFilter("");
        setMapData(initialMapData);
        resetAndSetMarkers(initialMapData);
      } else {
        const filteredMarkersArr: Feature[] = initialMapData?.features.filter(
          (feature) => feature.type === "SWAP"
        );
        setSelectedFilter("Swap");
        const updatedMapData: MapData = {
          ...initialMapData,
          features: filteredMarkersArr,
        };
        setMapData(() => updatedMapData);
        resetAndSetMarkers(updatedMapData);
      }
      console.log(mapRef, location);
    }
  };

  return (
    <div className="pt-16 space-y-2">
      <Header />
      <SearchBar />
      <div className="flex gap-2 px-2">
        <Button
          selected={selectedFilter === "Free"}
          onClick={filterMarkers}
          value={"Free"}
        />
        <Button
          selected={selectedFilter === "Swap"}
          onClick={filterMarkers}
          value={"Swap"}
        />
      </div>
      {!mapData ? <Spinner /> : <Map mapData={mapData} />}
      <ItemDrawer />
    </div>
  );
};

export default Home;
