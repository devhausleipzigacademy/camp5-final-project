import { UserListItem } from "../components/UserListItem/UserListItem";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { Item } from "../utils/types";
import { getUserItems } from "../utils/getUserItems";
import { Spinner } from "../components/Spinner/Spinner";
import CreateItemButton from "../components/CreateButton";
import { useSession } from "next-auth/react";

const UserItems = () => {
  const [initialUserItem, setInitialUserItem] = useState<Item[]>([]);
  const [listData, setListData] = useState<Item[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [itemDeleted, setItemDeleted] = useState<number>(0);
  const session = useSession();

  let userId = session.data.user.id;
  let itemId: string;
  async function getData() {
    const userItemFetch = await getUserItems(userId);
    setInitialUserItem(userItemFetch);
    setListData(userItemFetch);
  }
  async function deleteUserListItem(identifier: string) {
    console.log("click");
    fetch(`/api/item?identifier=${identifier}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response.status);
    });
    await getData();
    setItemDeleted((prev) => prev + 1);
  }

  // function useDeleteItemId(itemId: string) {
  //   deleteUserListItem(itemId);

  // }

  useEffect(() => {
    getData();
  }, [itemDeleted]);

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
      } else {
        setSelectedFilter("Swap");

        const filteredItemsArr: Item[] = initialUserItem.filter(
          (item) => item.sellType === "SWAP"
        );
        setListData(filteredItemsArr);
      }
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] px-2 overflow-scroll bg-BG">
      <div className="pt-2 flex gap-2 bg-BG">
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
      <div className="flex flex-col">
        {!listData ? (
          <div className="flex items-center justify-between">
            <Spinner height={73} />
          </div>
        ) : (
          <>
            <ul className="text-left">
              {
                <div id="listings" className="listings">
                  {listData.length === 0 && (
                    <div className="flex text-center justify-center items-center w-full h-[73.5vh] rounded-md">
                      <p>no items found</p>
                    </div>
                  )}
                  {listData.length > 0 &&
                    listData.map((listData, i) => (
                      <UserListItem
                        key={i}
                        i={i}
                        item={listData}
                        deleteItemId={deleteUserListItem}
                      />
                    ))}
                </div>
              }
            </ul>
          </>
        )}
      </div>
      <div className="flex flex-grow"></div>
      <div className="flex pb-4 justify-center text-primary">
        <CreateItemButton />
      </div>
    </div>
  );
};

export default UserItems;
