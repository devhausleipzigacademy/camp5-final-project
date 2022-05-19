import { Coord } from "@turf/turf";
import { LngLatLike } from "mapbox-gl";
import { useState } from "react";

export default function getUserLocation(map: any) {
  const [userLocation, setUserLocation] = useState<Coord>();

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
    setUserLocation(userCoordinates);
  });
  return userLocation as Coord;
}
