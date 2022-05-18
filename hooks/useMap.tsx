import mapboxgl from "mapbox-gl";
import { Dispatch, useEffect, useState } from "react";
import { stores } from "../assets/data";
import addMarkers from "../utils/addMarkers";

export default function useMap(
  map: any,
  setZoom: Dispatch<React.SetStateAction<number>>
) {
  const [ulng, setULng] = useState(12.37);
  const [ulat, setULat] = useState(51.34);
  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);

  let from = [ulng, ulat];

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  });

  useEffect(() => {
    if (!map.current) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      setULng(userCoordinates[0]);
      setULat(userCoordinates[1]);
      //@ts-ignore
      map.current.addSource("user-coordinates", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: userCoordinates,
          },
        },
      });
      //@ts-ignore

      map.current.addLayer({
        id: "user-coordinates",
        source: "user-coordinates",
        type: "circle",
      });
      //@ts-ignore

      map.current.flyTo({
        center: userCoordinates,
        zoom: 14,
      });
    });

    // @ts-ignore
    map.current.on("load", () => {
      //@ts-ignore
      map.current.addControl(geolocate);
      // @ts-ignore
      geolocate.trigger();
      // @ts-ignore
      map.addSource("places", {
        type: "geojson",
        data: stores,
      });
    });
    addMarkers(from, map);

    //@ts-ignore
    map.current.on("move", () => {
      //@ts-ignore

      setLng(map.current.getCenter().lng.toFixed(4));
      //@ts-ignore

      setLat(map.current.getCenter().lat.toFixed(4));
      //@ts-ignore

      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return { from, lng, lat, ulng, ulat };
}
