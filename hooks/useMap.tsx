import { Coord } from "@turf/turf";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useRouter } from "next/router";
import { Dispatch, useEffect, useState } from "react";
import { useLocationStore } from "../stores/locationStore";
import { MapRef } from "../stores/mapStore";
import { useMarkerStore } from "../stores/markerStore";
import addMarkers from "../utils/addMarkers";
import { Feature, ListData, MapData } from "../utils/types";

export default function useMap(
  map: MapRef,
  setZoom: Dispatch<React.SetStateAction<number>>,
  mapData: MapData
) {
  const { setLocation, location } = useLocationStore();
  // const [markers, setMarkers] = useState<Feature[] | undefined>([]);
  const { setMarkerArray } = useMarkerStore();

  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);

  const router = useRouter();

  useEffect(() => {
    //check, if map actually exists
    if (!map.current) {
      return;
    }
    map.current.on("load", () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const userCoordinates = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        //feed user location infomation to the map
        (map.current as mapboxgl.Map).addSource("user-coordinates", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: userCoordinates,
            },
          } as any,
        });

        //display user location  on map
        (map.current as mapboxgl.Map).addLayer({
          id: "user-coordinates",
          source: "user-coordinates",
          type: "circle",
        });

        //center map on user location
        (map.current as mapboxgl.Map).flyTo({
          center: userCoordinates as LngLatLike,
          zoom: 14,
        });

        //store user location
      });
      // create button for centering the map manually on user
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      // place button on map
      (map.current as mapboxgl.Map).addControl(geolocate);
      //geolocate.trigger();
      (map.current as mapboxgl.Map).addSource("places", {
        type: "geojson",
        data: mapData as any,
      });
    });

    // place all markers other than user on map

    const markerArray = addMarkers(location, map, mapData as MapData, router);
    if (markerArray?.length) {
      setMarkerArray(markerArray);
    }

    //enable scrolling and zooming for map and get the coordinates of the center on move
    (map.current as mapboxgl.Map).on("move", () => {
      setLng(Number((map.current as mapboxgl.Map).getCenter().lng.toFixed(4)));
      setLat(Number((map.current as mapboxgl.Map).getCenter().lat.toFixed(4)));
      setZoom(Number((map.current as mapboxgl.Map).getZoom().toFixed(2)));
    });
  }, []);
  // returns lng lat of map-center
  return { lng, lat };
}
