import { Coord } from "@turf/turf";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { Dispatch, useEffect, useState } from "react";
import { stores } from "../assets/data";
import addMarkers from "../utils/addMarkers";
import getUserLocation from "../utils/getUserLocation";

export default function useMap(
  map: any,
  setZoom: Dispatch<React.SetStateAction<number>>
) {
  const [lng, setLng] = useState(12.37);
  const [lat, setLat] = useState(51.34);
  let userLocation: Coord = [];

  useEffect(() => {
    //check, if map actually exists
    if (!map.current) return;

    // get userlocation
    userLocation = getUserLocation(map);

    //   //feed user location infomation to the map
    //   (map.current as mapboxgl.Map).addSource("user-coordinates", {
    //     type: "geojson",
    //     data: {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: userLocation,
    //       },
    //     } as any,
    //   });

    //   //display user location  on map
    //   (map.current as mapboxgl.Map).addLayer({
    //     id: "user-coordinates",
    //     source: "user-coordinates",
    //     type: "circle",
    //   });

    //   //center map on user location
    //   (map.current as mapboxgl.Map).flyTo({
    //     center: userLocation as LngLatLike,
    //     zoom: 14,
    //   });

    //   //store user location
    // });

    map.current.on("load", () => {
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
        data: stores as any,
      });
    });

    // place all markers other than user on map
    addMarkers(userLocation as Coord, map);

    //enable scrolling and zooming for map
    (map.current as mapboxgl.Map).on("move", () => {
      setLng(Number((map.current as mapboxgl.Map).getCenter().lng.toFixed(4)));
      setLat(Number((map.current as mapboxgl.Map).getCenter().lat.toFixed(4)));
      setZoom(Number((map.current as mapboxgl.Map).getZoom().toFixed(2)));
    });
  }, []);

  return { userLocation, lng, lat };
}
