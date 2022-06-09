import { UserListItem } from "../components/UserListItem/UserListItem";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Button from "../components/Button/Button";
import { Item } from "../utils/types";
import { getUserItems } from "../utils/getUserItems";
import { itemList } from "../utils/filterList";
import { Spinner } from "../components/Spinner/Spinner";

const UserItems = () => {
  const [initialUserItem, setInitialUserItem] = useState<Item[]>([]);
  const [listData, setListData] = useState<Item[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  let userId = "41b22c76-296f-42ff-a08c-93e00a2ad402";

  async function getData() {
    const userItemFetch = await getUserItems(userId);
    setInitialUserItem(userItemFetch);
    setListData(userItemFetch);
  }

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (initialUserItem.length) {
  //     itemList(selectedFilter, initialUserItem, setListData);
  //   }
  // }, [initialUserItem, selectedFilter]);

  function filterButtons(event: React.MouseEvent<HTMLButtonElement>) {
    if (!initialUserItem) {
      return;
    } else if ((event.target as HTMLButtonElement).value === "Free") {
      if (selectedFilter === "Free") {
        setSelectedFilter("");
        setListData(initialUserItem);
      } else {
        setSelectedFilter("Free");
        const filteredItemsArr: Item[] = initialUserItem.filter(
          (item) => item.sellType === "FREE"
        );
        setListData(filteredItemsArr);
      }
    } else {
      if (selectedFilter === "Swap") {
        setSelectedFilter("");
        setListData(initialUserItem);
        console.log(listData);
      } else {
        setSelectedFilter("Swap");

        const filteredItemsArr: Item[] = initialUserItem.filter(
          (item) => item.sellType === "SWAP"
        );
        setListData(filteredItemsArr);
        console.log(listData);
      }
    }
  }

  return (
    <div className="pt-20">
      <div className="flex gap-2 px-2 pb-4">
        <Button
          type="button"
          selected={selectedFilter === "Free"}
          onClick={filterButtons}
          value={"Free"}
        />
        <Button
          type="button"
          selected={selectedFilter === "Swap"}
          onClick={filterButtons}
          value={"Swap"}
        />
      </div>
      <div className="flex-1 overflow-y-scroll">
        {!listData ? (
          <div className="flex items-center justify-center pt-12">
            <Spinner height={73} />
          </div>
        ) : (
          <>
            <ul className="px-3 text-left">
              {
                <div id="listings" className="listings">
                  {listData.length === 0 && (
                    <div className="flex text-center justify-center items-center w-full h-[73.5vh] rounded-md">
                      <p>no items found</p>
                    </div>
                  )}
                  {listData.length > 0 &&
                    listData.map((listData, i) => (
                      <UserListItem key={i} i={i} item={listData} />
                    ))}
                </div>
              }
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default UserItems;
