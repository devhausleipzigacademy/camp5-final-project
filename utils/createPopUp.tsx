import mapboxgl from "mapbox-gl";
import type { Feature, ListData } from "./types";
import * as turf from "@turf/turf";
import Link from "next/link";
import router, { NextRouter, useRouter } from "next/router";
import { MouseEvent } from "react";
import { render } from "react-dom";
import { Node } from "typescript";
import { resolveHref } from "next/dist/shared/lib/router/router";

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

  // example product page path name
  // /item?title=Glasses&identifier=751861a4-5fb8-45f2-91f7-151246f5c94a&distance=5.76&owner=Petra

  const PopUp = () => {
    function LinkGen(feature: Feature, distanceNo: string) {
      const ProductLink = {
        pathname: "/item",
        query: {
          title: feature.properties.title,
          identifier: feature.properties.id,
          distance: distanceNo,
          owner: feature.properties.owner,
        },
      };
      return ProductLink;
    }
    const LinkString = LinkGen(feature, distanceNo);
    const popUpLink = `${LinkString.pathname}?title=${LinkString.query.title}&identifier=${LinkString.query.identifier}&distance=${LinkString.query.distance}&owner=${LinkString.query.owner}`;
    return (
      <>
        <Link href={popUpLink}>
          <a onClick={() => router.push(popUpLink)}>
            <h3>{feature.properties.title}</h3>
            <span>{distance}</span>
            <p>{feature.properties.owner}</p>
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
