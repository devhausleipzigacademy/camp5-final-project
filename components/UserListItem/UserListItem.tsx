import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { formatDistance, subDays } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import reactSelect from "react-select";
import { getUser } from "../../utils/getUser";
import { Item } from "../../utils/types";
import Link from "next/link";

type Props = {
  item: Item;
  i: number;
  useDeleteItemId: Function;
};

// selectedFilter: string;

type User = {
  identifier: string;
  firstname: string;
  lastname: string;
};

export const UserListItem = ({ item, i, useDeleteItemId }: Props) => {
  // ------------- recipient logic ------------ //
  // let recipientID = item.recipientId;
  // const initialUser = {
  //   identifier: "",
  //   firstname: "",
  //   lastname: "",
  // };
  // const [reciObj, setReciObj] = useState<User>(initialUser);

  // async function getRecipient() {
  //   const userFetch = await getUser(recipientID as string);
  //   setReciObj(userFetch);
  // }

  // useEffect(() => {
  //   getRecipient();
  //   console.log("effect", reciObj);
  // }, []);

  // ------- date logic ---------- //
  let posted = formatDistance(
    subDays(new Date(item.createdAt), 0),
    new Date(),
    {
      addSuffix: true,
    }
  );
  // -------- image logic -------- //
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
                item.sellType === "SWAP" ? (
                  <div className="italic text-xs leading-8">
                    Swapped
                    {/* with {reciObj.firstname} */}
                  </div>
                ) : (
                  <div className="italic text-xs leading-8">
                    Gifted
                    {/* to {reciObj.firstname} */}
                  </div>
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
        <div className="fixed right-1">
          {item.gone ? (
            <div>
              <PencilIcon className="w-4 h-4 opacity-0" />
              <TrashIcon className="w-4 h-4 absolute top-10" />
            </div>
          ) : (
            <div>
              <Link href={"/editproduct"} itemID={item.identifier}>
                <PencilIcon className="w-5 h-5" />
              </Link>

              <TrashIcon
                className="w-4 h-4 absolute top-10"
                onClick={() => useDeleteItemId(item.identifier)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
};
