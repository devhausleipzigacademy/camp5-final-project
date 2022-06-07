import { SellType } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Feature } from "../../utils/types";

type Props = {
  itemImage: string;
  itemType: SellType;
  itemTitle: string;
  itemPosted: string;
  itemRequests: number;
  itemGone: boolean;
  itemRecipient: string;
};

export const UserListItem = (item: Props) => {
  let requestStatus;
  if (item.itemGone) {
    requestStatus = <div>Item is gone</div>;
  } else if (item.itemRequests > 0 && item.itemType === "SWAP") {
    requestStatus = <div>{item.itemRequests} pending swap requests</div>;
  } else if (!item.itemRequests && item.itemType === "SWAP") {
    requestStatus = <div>No swap requests</div>;
  } else if (item.itemRequests > 0 && item.itemType === "FREE") {
    requestStatus = <div>{item.itemRequests} pending requests</div>;
  } else if (!item.itemRequests && item.itemType === "FREE") {
    requestStatus = <div>No requests</div>;
  }

  return (
    <div
      className={item.itemGone ? "flex p-4 gap-3 opacity-50" : "flex p-4 gap-3"}
    >
      <Image
        src={item.itemImage}
        height={50}
        width={50}
        objectFit="cover"
        layout="intrinsic"
      />

      <div>
        <div className={item.itemGone ? "line-through" : "no-underline"}>
          {item.itemTitle}
        </div>
        <div>{`Posted on ${item.itemPosted}`}</div>
        {item.itemGone && item.itemType === "SWAP" ? (
          requestStatus
        ) : (
          <div>Swapped with {item.itemRecipient}</div>
        )}
        {item.itemGone && item.itemType === "FREE" ? (
          requestStatus
        ) : (
          <div>Gifted to {item.itemRecipient}</div>
        )}
      </div>
    </div>
  );
};
