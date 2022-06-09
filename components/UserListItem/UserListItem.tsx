import { SellType } from "@prisma/client";
import { dissolve } from "@turf/turf";
import { formatDistance, subDays } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import { Item } from "../../utils/types";
import Button from "../Button/Button";

type Props = {
  item: Item;
  i: number;
};

export const UserListItem = ({ item, i }: Props) => {
  let posted = formatDistance(
    subDays(new Date(item.createdAt), 0),
    new Date(),
    {
      addSuffix: true,
    }
  );

  let imagesrc = JSON.parse(JSON.stringify(item.images));
  let firstImage;
  for (var key in imagesrc) {
    if (imagesrc.hasOwnProperty(key)) {
      firstImage = Object(imagesrc)[key];
      break;
    }
  }
  if (!item) return <></>;
  else {
    let imagesArray: string[] = Object.values(firstImage);
    let imageYEAH: string = imagesArray.join("");

    return (
      <div
        className={
          item.gone
            ? "flex pr-4 pl-4 pt-1 gap-3 opacity-50"
            : "flex pr-4 pl-4 pt-3 gap-3"
        }
      >
        <div
          className={
            !item.gone && item.requests > 0
              ? "relative h-20 w-20 border-solid border-2 border-secondary box-border"
              : "relative h-20 w-20"
          }
        >
          <Image
            src={imageYEAH}
            height={50}
            width={50}
            objectFit="cover"
            layout="responsive"
          />
        </div>

        <div>
          <div
            className={
              item.gone
                ? "line-through text-basis font-semibold"
                : "text-basis font-semibold"
            }
          >
            <div className="flex items-center mt-2">
              {item.title}
              {!item.gone && item.requests > 0 ? (
                <div className="rounded-full bg-secondary w-3 h-3 ml-2" />
              ) : null}
            </div>
          </div>
          <div className="text-sm">
            <div>{`Posted ${posted}`}</div>
            <div className="leading-8">
              {item.gone ? (
                item.sellType === "swap" ? (
                  <div>Swapped with {item.recipientId}</div>
                ) : (
                  <div>Gifted to {item.recipientId}</div>
                )
              ) : item.requests > 0 ? (
                <div>{item.requests} pending Swap Requests</div>
              ) : item.sellType === "free" ? (
                <p className="italic text-xs leading-8">free</p>
              ) : (
                <div>No Swap Requests yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
