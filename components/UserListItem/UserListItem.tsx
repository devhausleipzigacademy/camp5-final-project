import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { SellType } from "@prisma/client";
import { dissolve } from "@turf/turf";
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
    itemRecipient?: string;
};

export const UserListItem = (item: Props) => {
    // let requestStatus;
    // if (item.itemGone) {
    //   requestStatus = <div>Item is gone</div>;
    // } else if (item.itemRequests > 0 && item.itemType === "SWAP") {
    //   requestStatus = <div>{item.itemRequests} pending swap requests</div>;
    // } else if (!item.itemRequests && item.itemType === "SWAP") {
    //   requestStatus = <div>No swap requests</div>;
    // } else if (item.itemRequests > 0 && item.itemType === "FREE") {
    //   requestStatus = <div>{item.itemRequests} pending requests</div>;
    // } else if (!item.itemRequests && item.itemType === "FREE") {
    //   requestStatus = <div>No requests</div>;
    // }

    return (
        <div
            className={
                item.itemGone
                    ? "flex pr-4 pl-4 pt-1 gap-3 opacity-50"
                    : "flex pr-4 pl-4 pt-3 gap-3"
            }
        >
            <div
                className={
                    !item.itemGone && item.itemRequests > 0
                        ? "relative h-20 w-20 border-solid border-2 border-secondary box-border"
                        : "relative h-20 w-20"
                }
            >
                <Image
                    src={item.itemImage}
                    height={50}
                    width={50}
                    objectFit="cover"
                    layout="responsive"
                />
            </div>

            <div>
                <div
                    className={
                        item.itemGone
                            ? "line-through text-basis font-semibold"
                            : "text-basis font-semibold"
                    }
                >
                    <div className="flex items-center mt-2">
                        {item.itemTitle}
                        {!item.itemGone && item.itemRequests > 0 ? (
                            <div className="rounded-full bg-secondary w-3 h-3 ml-2" />
                        ) : null}
                    </div>
                </div>
                <div className="text-sm">
                    <div>{`Posted on ${item.itemPosted}`}</div>
                    <div className="leading-8">
                        {item.itemGone ? (
                            item.itemType === "SWAP" ? (
                                <div>Swapped with {item.itemRecipient}</div>
                            ) : (
                                <div>Gifted to {item.itemRecipient}</div>
                            )
                        ) : item.itemRequests > 0 ? (
                            <div>{item.itemRequests} pending Swap Requests</div>
                        ) : item.itemType === "FREE" ? (
                            <p className="italic text-xs leading-8">free</p>
                        ) : (
                            <div>No Swap Requests yet</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="fixed right-1">
                {item.itemGone ? (
                    <div>
                        <PencilIcon className="w-4 h-4 opacity-0" />
                        <TrashIcon className="w-4 h-4 absolute top-10" />
                    </div>
                ) : (
                    <div>
                        <PencilIcon className="w-4 h-4" />
                        <TrashIcon className="w-4 h-4 absolute top-10" />
                    </div>
                )}
            </div>
        </div>
    );
};
