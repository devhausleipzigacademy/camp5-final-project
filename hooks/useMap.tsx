import { Coord } from "@turf/turf";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { Dispatch, useEffect, useState } from "react";
import { stores } from "../assets/data";
import addMarkers from "../utils/addMarkers";

export default function useMap(
  map: any,
  setZoom: Dispatch<React.SetStateAction<number>>
) {
  const [userLocation, setUserLocation] = useState<Coord>();

  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);

  useEffect(() => {
    if (!map.current) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
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
      setUserLocation(userCoordinates);

      (map.current as mapboxgl.Map).addLayer({
        id: "user-coordinates",
        source: "user-coordinates",
        type: "circle",
      });

      (map.current as mapboxgl.Map).flyTo({
        center: userCoordinates as LngLatLike,
        zoom: 14,
      });
    });

    map.current.on("load", () => {
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });
      (map.current as mapboxgl.Map).addControl(geolocate);
      //geolocate.trigger();
      (map.current as mapboxgl.Map).addSource("places", {
        type: "geojson",
        data: stores as any,
      });
    });
    addMarkers(userLocation as Coord, map);

    (map.current as mapboxgl.Map).on("move", () => {
      setLng(Number((map.current as mapboxgl.Map).getCenter().lng.toFixed(4)));
      setLat(Number((map.current as mapboxgl.Map).getCenter().lat.toFixed(4)));
      setZoom(Number((map.current as mapboxgl.Map).getZoom().toFixed(2)));
    });
  }, []);

  return { userLocation, lng, lat };
}
