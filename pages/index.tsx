import mapboxgl from "mapbox-gl";
import type { NextPage } from "next";
import Image from "next/image";
import React, { Component } from "react";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import ItemDrawer from "../components/ItemDrawer/ItemDrawer";
import Map from "../components/map";
import { getMapData } from "../utils/getMapData";
import { MapData, Feature } from "../utils/types";
import { Spinner } from "../components/Spinner/Spinner";
import addMarkers from "../utils/addMarkers";
import { useMapStore } from "../stores/mapStore";
import { useLocationStore } from "../stores/locationStore";
import { useMarkerStore } from "../stores/markerStore";
import { signOut, useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import Search from "../components/Search/Search";
import Button from "../components/Button/Button";
import { useItemStore } from "../stores/itemStore";

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
    const [selectedFilter, setSelectedFilter] = useState<string>("");
    const { items, setItems } = useItemStore();
    // const [data, setData] = useState<MapData | null>(null);

    async function getAllMapData() {
        if (items.features.length !== 0) {
            setMapData(items);
            setInitialMapData(items);
        } else {
            const mapDataFetch = await getMapData();
            setMapData(mapDataFetch);
            setInitialMapData(mapDataFetch);
            setItems(mapDataFetch);
        }
    }

    useEffect(() => {
        getAllMapData();
    }, []);

    const { marker } = useMarkerStore();

    function resetAndSetMarkers(updatedMapData: MapData, router: NextRouter) {
        const popUps = document.getElementsByClassName("mapboxgl-popup");
        if (popUps[0]) popUps[0].remove();
        marker?.forEach((m) => m.remove());
        const markerElements = document.getElementsByClassName("marker");
        while (markerElements.length > 0) {
            markerElements[0].remove();
        }
        addMarkers(location, mapRef, updatedMapData as MapData, router);
    }

    const filterMarkers = (
        event: React.MouseEvent<HTMLButtonElement>,
        router: NextRouter
    ) => {
        if (!initialMapData) {
            return;
        } else if ((event.target as HTMLButtonElement).value === "Free") {
            if (selectedFilter === "Free") {
                setSelectedFilter("");
                setMapData(initialMapData);
                resetAndSetMarkers(initialMapData, router);
            } else {
                const filteredMarkersArr: Feature[] =
                    initialMapData?.features.filter(
                        (feature) => feature.type === "FREE"
                    );
                setSelectedFilter("Free");
                const updatedMapData: MapData = {
                    ...initialMapData,
                    features: filteredMarkersArr,
                };
                setMapData(() => updatedMapData);
                resetAndSetMarkers(updatedMapData, router);
            }
        } else {
            if (selectedFilter === "Swap") {
                setSelectedFilter("");
                setMapData(initialMapData);
                resetAndSetMarkers(initialMapData, router);
            } else {
                const filteredMarkersArr: Feature[] =
                    initialMapData?.features.filter(
                        (feature) => feature.type === "SWAP"
                    );
                setSelectedFilter("Swap");
                const updatedMapData: MapData = {
                    ...initialMapData,
                    features: filteredMarkersArr,
                };
                setMapData(() => updatedMapData);
                resetAndSetMarkers(updatedMapData, router);
            }
            console.log(mapRef, location);
        }
    };
    const [showMap, setShowMap] = useState<boolean>(true);
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
        <div className="space-y-2 h-[calc(100vh-64px)]">
            <Search properties={mapData?.features!} />
            <div className="flex gap-2 px-2">
                <Button
                    type="button"
                    selected={selectedFilter === "Free"}
                    onClick={(evt) => filterMarkers(evt, router)}
                    value={"Free"}
                />
                <Button
                    type="button"
                    selected={selectedFilter === "Swap"}
                    onClick={(evt) => filterMarkers(evt, router)}
                    value={"Swap"}
                />
            </div>
            {!mapData ? (
                <div className="flex text-center items-center w-full h-[73.5vh] rounded-md">
                    <Spinner />
                </div>
            ) : (
                <Map mapData={mapData} />
            )}
            <ItemDrawer selectedFilter={selectedFilter}></ItemDrawer>
        </div>
    );
};

export default Home;
