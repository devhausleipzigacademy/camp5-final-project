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
import resetAndSetMarkers from "../utils/resetAndSetMarkers";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

const Home: NextPage = () => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  // const [initialMapData, setInitialMapData] = useState<MapData | null>(null);
  // const { location } = useLocationStore();
  // const { mapRef } = useMapStore();
  // const [selectedFilter, setSelectedFilter] = useState("all");
  // const [activateFree, setActivateFree] = useState("secondary");
  // const [activateSwap, setActivateSwap] = useState("secondary");
  // const [free, setFree] = useState(true);
  // const [swap, setSwap] = useState(true);
  const [buttonData, setButtonData] = useState<string[]>([]);

  function parentCallback(buttonData: string[]) {
    setButtonData(buttonData);
  }

  console.log(buttonData);

  // const filterMarkers()

  // make event handler that only returns free=boolean swap=boolean

  // pass this into to filter functions

  // filterfunction
  // if (free === true) -> show free markers 1F + toggle bgColor
  // if (swap === true) -> show swap markers 1F + toggle bgColor
  // THEN:
  // remove markers

  return (
    <div className="pt-16 space-y-2">
      <Header />
      <SearchBar />
      <FilterButtons parentCallback={parentCallback} />
      {!mapData ? <Spinner /> : <Map mapData={mapData} />}
      <ItemDrawer />
    </div>
  );
};

export default Home;
