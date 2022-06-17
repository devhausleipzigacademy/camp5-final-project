import { UserListItem } from "../components/UserListItem/UserListItem";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { Item } from "../utils/types";
import { getUserItems } from "../utils/getUserItems";
import { Spinner } from "../components/Spinner/Spinner";
import CreateItemButton from "../components/CreateButton";
import { useSession } from "next-auth/react";
import { GetUserEmail } from "../utils/checkUserEmail";
import { Session } from "next-auth";

const UserItems = () => {
  const [initialUserItem, setInitialUserItem] = useState<Item[]>([]);
  const [listData, setListData] = useState<Item[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [itemDeleted, setItemDeleted] = useState<number>(0);
  let isUser = false;
  const { data: session, status } = useSession();

  // if (session === undefined) {
  //   console.log("session is undefined");
  // } else {
  //   const userEmail = GetUserEmail(session!.user!.email as string);
  //   console.log("email: ", userEmail);
  // }
  async function deleteUserListItem(identifier: string) {
    console.log("click");
    fetch(`/api/item?identifier=${identifier}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response.status);
    });
    await getData();
  }

  async function GetUserEmail(
    session: Session | null
  ): Promise<string | undefined> {
    if (session === null || session === undefined) {
      return userEmail;
    } else {
      const userEmail = session!.user!.email;
      let dbUserEmail: string;
      try {
        dbUserEmail = await fetch(
          `http://localhost:3000/api/user_email?email=${userEmail}`,
          {
            method: "GET",
          }
        ).then((r) => r.json());
      } catch (err) {
        console.log(err);
      }
    }
  }
  let userEmail = GetUserEmail(session);
  let userId = "0cd6887e-3950-4dac-821d-2b2c9d6b1bda";
  let itemId: string;
  async function getData() {
    const userItemFetch = await getUserItems(userId);
    setInitialUserItem(userItemFetch);
    setListData(userItemFetch);
  }

  function useDeleteItemId(itemId: string) {
    deleteUserListItem(itemId);
  }

  useEffect(() => {
    getData();
  }, [session]);

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
                      <UserListItem
                        key={i}
                        i={i}
                        item={listData}
                        useDeleteItemId={useDeleteItemId}
                        // deleteItemId={deleteItemId}
                      />
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
