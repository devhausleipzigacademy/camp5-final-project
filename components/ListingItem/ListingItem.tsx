import Image from "next/image";
import flyToStore from "../../utils/flyToStore";
import createPopUp from "../../utils/createPopUp";
import { Coord } from "@turf/turf";
import { Feature, ListData } from "../../utils/types";
import useUserLocation from "../../utils/useUserLocation";
import useDistance from "../../utils/useDistance";
import React from "react";
import { useLocationStore } from "../../stores/locationStore";
import { useMapStore } from "../../stores/mapStore";
import { useRouter } from "next/router";

interface Props {
  feature: Feature;
  i: number;
  onClose: () => void;
}

const ListingItem = ({ feature, i, onClose }: Props) => {
  const router = useRouter();
  const distance = useDistance(feature);
  const { location } = useLocationStore();
  const { mapRef } = useMapStore();
  let firstImage;
  for (var key in feature.properties.image) {
    if (feature.properties.image.hasOwnProperty(key)) {
      firstImage = Object(feature.properties.image)[key];
      break;
    }
  }

  return (
    <div
      id={`listing-${i}`}
      className="item"
      onClick={() => {
        onClose();
        createPopUp(feature, location, mapRef, router);
        setTimeout(() => flyToStore(feature, mapRef), 300);
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }

        const thisElement = document.getElementById(`listing-${i}`);
        (thisElement as HTMLElement).classList.add("active");
      }}
    >
      <div className="flex w-full gap-2 items-center">
        <Image
          src={firstImage}
          alt=""
          layout="intrinsic"
          // sizes="100vw"
          height={80}
          width={80}
          objectFit="cover"
        />
        <div className="flex w-full justify-between items-center">
          <a href="#" className="title" id={`link-${i}`}>
            <div className="flex-col">
              <div>{feature.properties.title}</div>
              <div>{distance}</div>
              <p>{feature.type.toLowerCase()}</p>
            </div>
          </a>
          <Image
            src={feature.properties.profilePicture as string}
            alt=""
            layout="fixed"
            // sizes="100vw"
            height={60}
            width={60}
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
