import mapboxgl from "mapbox-gl";
import type { Feature, ListData } from "./types";
import * as turf from "@turf/turf";
import Link from "next/link";
import router, { NextRouter, useRouter } from "next/router";
import { MouseEvent } from "react";
import { render } from "react-dom";
import { Node } from "typescript";

export default function createPopUp(
  feature: Feature,
  userLocation: number[],
  map: any,
  router: NextRouter
) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  let distanceNo: string;
  let distance = turf
    .distance(userLocation, feature.geometry.coordinates)
    .toFixed(2);
  if (distance < "1") {
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distanceNo = distance;
    distance = "distance: " + distance + "km";
  }
  function LinkGen(feature: Feature, distanceNo: string, router: NextRouter) {
    router.push({
      pathname: "/item",
      query: {
        title: feature.properties.title,
        identifier: feature.properties.id,
        distance: distanceNo,
        owner: feature.properties.owner,
      },
    });
    const href = router.asPath;
    return href;
  }

  const PopUp = () => {
    return (
      <>
        <Link href={LinkGen(feature, distanceNo, router)}>
          <a>
            <h3>${feature.properties.title}</h3>
            <span>${distance}</span>
            <p>${feature.properties.owner}</p>
          </a>
        </Link>
      </>
    );
  };

  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: false });
  const popupNode = document.createElement("div");
  render(<PopUp />, popupNode);
  popup
    .setLngLat(feature.geometry.coordinates)
    .setDOMContent(popupNode)
    .addTo(map.current as mapboxgl.Map);
}
