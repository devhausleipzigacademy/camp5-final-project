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
};

export const UserListItem = (item: Props) => {
  return (
    <div className="flex p-4 gap-3">
      <Image
        src={item.itemImage}
        height={50}
        width={50}
        objectFit="cover"
        layout="intrinsic"
      />
      <div>
        <div>{item.itemTitle}</div>
        <div>{`Posted On ${item.itemPosted}`}</div>
        <div></div>
      </div>
    </div>
  );
};
