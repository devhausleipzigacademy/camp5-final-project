import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { formatDistance, subDays } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import reactSelect from "react-select";
import { getUser } from "../../utils/getUser";
import { Item } from "../../utils/types";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog/ConfirmDeleteDialog";

type Props = {
  item: Item;
  i: number;
  // deleteItemId: Function;
  useDeleteItemId: Function;
};

export const UserListItem = ({
  item,
  i,
  useDeleteItemId,
}: // deleteItemId,
Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
        className={clsx("flex justify-between pt-3", item.gone && "opacity-50")}
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
                item.sellType === "SWAP" ? (
                  <div>Swapped with {item.recipientId}</div>
                ) : (
                  <div>Gifted to {item.recipientId}</div>
                )
              ) : item.requests > 0 ? (
                <div>{item.requests} pending Swap Requests</div>
              ) : item.sellType === "FREE" ? (
                <p className="italic text-xs leading-8">free</p>
              ) : (
                <div>No Swap Requests yet</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-6 justify-center">
          {item.gone ? (
            <>
              <PencilIcon className="w-4 h-4 opacity-0" />
              <TrashIcon className="w-4 h-4" />
            </>
          ) : (
            <>
              <Link href={"/editproduct"} itemID={item.identifier}>
                <PencilIcon className="w-5 h-5" />
              </Link>

              <TrashIcon
                className="w-5 h-5"
                onClick={() => setShowDeleteDialog(true)}
              />
            </>
          )}
        </div>
        {showDeleteDialog && (
          <ConfirmDeleteDialog
            itemId={item.identifier}
            useDeleteItemId={useDeleteItemId}
            open={showDeleteDialog}
            setOpen={setShowDeleteDialog}
          />
        )}
      </div>
    );
  }
};
