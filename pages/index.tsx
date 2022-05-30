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
import FilterButtons from "../components/FilterButtons/filterButtons";
import { Spinner } from "../components/Spinner/Spinner";
import addMarkers from "../utils/addMarkers";
import { useMapStore } from "../stores/mapStore";
import { useLocationStore } from "../stores/locationStore";
import { useMarkerStore } from "../stores/markerStore";
import { isFunctionDeclaration } from "typescript";
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
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activateFree, setActivateFree] = useState("secondary");
  const [activateSwap, setActivateSwap] = useState("secondary");

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
      // DEACTIVATE
      if (selectedFilter === "Swap") {
        setSelectedFilter("all"); // swap comes back in
        setMapData(initialMapData);
        resetAndSetMarkers(initialMapData);
        setActivateFree("secondary");
        // ACTIVATE
      } else if (selectedFilter === "all") {
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
        setActivateFree("primary");
        // another if statement with selectedFilter("none")
      } else if (activateFree === "secondary" && activateSwap === "primary") {
        setSelectedFilter("none");
        const filteredMarkersArr: Feature[] = [];
        const updatedMapData: MapData = {
          ...initialMapData,
          features: filteredMarkersArr,
        };
        resetAndSetMarkers(updatedMapData);
        setActivateFree("primary");
      } else if (selectedFilter === "none") {
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
        setActivateFree("secondary");
      }
      console.log(mapRef, location);
    } else if ((event.target as HTMLButtonElement).value === "Swap") {
      // DEACTIVATE
      if (selectedFilter === "Free") {
        setSelectedFilter("all"); // free comes back in
        setMapData(initialMapData);
        resetAndSetMarkers(initialMapData);
        setActivateSwap("secondary");
        // ACTIVATE
      } else if (selectedFilter === "all") {
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
        setActivateSwap("primary");
      } else if (activateFree === "primary" && activateSwap === "secondary") {
        setSelectedFilter("none");
        const filteredMarkersArr: Feature[] = [];
        const updatedMapData: MapData = {
          ...initialMapData,
          features: filteredMarkersArr,
        };
        resetAndSetMarkers(updatedMapData);
        setActivateSwap("primary");
      } else if (selectedFilter === "none") {
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
        setActivateSwap("secondary");
      }
      console.log(mapRef, location);
    }
    console.log();
  };

  return (
    <div className="pt-16 space-y-2">
      <Header />
      <SearchBar />
      {/* <FilterButtons clickHandler={filterMarkers} toggle={selectedFilter} /> */}
      <div className="flex gap-2 px-2">
        <Button bgColor={activateFree} onClick={filterMarkers} value={"Free"} />
        <Button bgColor={activateSwap} onClick={filterMarkers} value={"Swap"} />
      </div>
      {!mapData ? <Spinner /> : <Map mapData={mapData} />}
      <ItemDrawer />
    </div>
  );
};

export default Home;
