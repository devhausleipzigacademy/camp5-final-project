import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";
import Image from "next/image";
import React, { Component } from "react";
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
import { signOut, useSession } from "next-auth/react";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJvbjE4IiwiYSI6ImNsMzRibG9xYjB3ZjUzaW13d2s3bzVjcGkifQ.QGlBNyR336mJ2rFfFprAPg";

interface Session {
  data: string;
  status: string;
}

const Home: NextPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(14);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [initialMapData, setInitialMapData] = useState<MapData | null>(null);
  const { location } = useLocationStore();
  const { mapRef } = useMapStore();
  const [selectedFilter, setSelectedFilter] = useState("");

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
      // addMarkers(location, mapRef, mapData as MapData);
      console.log(mapRef, location);
    }
  };
  const [showMap, setShowMap] = useState<boolean>(false);
  function showMapHandler() {
    setShowMap((prev) => !prev);
    console.log(showMap);
  }

  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    console.log(session, status);
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  const loading = status === "loading";

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pt-16 space-y-2 h-[calc(100vh-64px)]">
      {showMap && (
        <>
          <Header />
          <SearchBar />
          <FilterButtons clickHandler={filterMarkers} />
          {!mapData ? <Spinner /> : <Map mapData={mapData} />}
          <ItemDrawer />
        </>
      )}

      {session && session.user && (
        <div className="flex w-screen h-2/3 justify-around items-center">
          <div className="flex-col text-center space-y-2">
            {session.user.image && (
              <span>
                <Image
                  src={session.user.image}
                  alt={session.user.name as string}
                  width={80}
                  height={80}
                  className={"rounded-full"}
                />
              </span>
            )}
            <p className="font-semibold">Welcome!</p>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <div className="flex-col space-y-2 pt-2 text-center w-full h-full">
              <Button
                bgColor={"primary"}
                value={"Sign Out"}
                onClick={() => signOut()}
                width={"1/2"}
                py={2}
              />
              <Button
                bgColor={"secondary"}
                value={"Let's Swap"}
                onClick={() => showMapHandler()}
                width={"1/2"}
                py={2}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
