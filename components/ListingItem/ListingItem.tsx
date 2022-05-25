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

interface Props {
  feature: Feature;
  i: number;
  onClose: () => void;
}

const ListingItem = ({ feature, i, onClose }: Props) => {
  const distance = useDistance(feature);
  const { location } = useLocationStore();
  const { mapRef } = useMapStore();
  // console.log(listData.image, listData.profilePicture);
  return (
    <div
      id={`listing-${i}`}
      className="item"
      onClick={() => {
        onClose();
        createPopUp(feature, location, mapRef);
        setTimeout(() => flyToStore(feature, mapRef), 300);
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }

        const thisElement = document.getElementById(`listing-${i}`);
        (thisElement as HTMLElement).classList.add("active");
      }}
    >
      <div className="flex gap-2 items-center">
        <Image
          src={feature.properties.image as string}
          alt=""
          layout="intrinsic"
          // sizes="100vw"
          height={50}
          width={50}
          objectFit="cover"
        />
        <div className="flex w-full justify-between">
          <a href="#" className="title" id={`link-${i}`}>
            <div className="flex-col">
              <div>{feature.properties.title}</div>
              <div>{distance}</div>
            </div>
          </a>
          <Image
            src={feature.properties.profilePicture as string}
            alt=""
            layout="intrinsic"
            // sizes="100vw"
            height={50}
            width={50}
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
