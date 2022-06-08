import { UserListItem } from "../components/UserListItem/UserListItem";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Button from "../components/Button/Button";
import { Feature, Item } from "../utils/types";
import { getListData } from "../utils/getListData";
import filterList from "../utils/filterList";
import { Spinner } from "../components/Spinner/Spinner";

const UserItems = () => {
  const [listData, setListData] = useState<Item[]>([]);
  const [initialListData, setInitialListData] = useState<Item[]>([]);
  const [selectedFilter, setSelectedFilter] =
    useState<"" | "Free" | "Swap">("");

  async function getData() {
    const listDataFetch = await getListData();
    setInitialListData(listDataFetch);
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (initialListData.length) {
      filterList(selectedFilter, initialListData, setListData);
    }
  }, [initialListData, selectedFilter]);

  return (
    <div className="pt-20">
      <div className="flex gap-2 px-2 pb-4">
        <Button
          type="button"
          selected={selectedFilter === "Free"}
          onClick={() => {}}
          value={"Free"}
        />
        <Button
          type="button"
          selected={selectedFilter === "Swap"}
          onClick={() => {}}
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
                    <div className="flex text-center items-center w-full h-[73.5vh] rounded-md">
                      <Spinner />
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

      <UserListItem
        itemImage={
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
        }
        itemType={"FREE"}
        itemTitle={"Boots"}
        itemPosted="03.06.2022"
        itemRequests={5}
        itemGone={true}
        itemRecipient={"Jonathan"}
      />
      <UserListItem
        itemImage={
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
        }
        itemType={"FREE"}
        itemTitle={"Boots"}
        itemPosted="03.06.2022"
        itemRequests={5}
        itemGone={false}
        itemRecipient={"Jonathan"}
      />
      <UserListItem
        itemImage={
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
        }
        itemType={"FREE"}
        itemTitle={"Boots"}
        itemPosted="03.06.2022"
        itemRequests={0}
        itemGone={false}
        itemRecipient={"Jonathan"}
      />
    </div>
  );
};

export default UserItems;
