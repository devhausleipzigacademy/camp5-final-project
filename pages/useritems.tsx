import { UserListItem } from "../components/UserListItem/UserListItem";
import React, { useState } from "react";
import { NextPage } from "next";
import Button from "../components/Button/Button";

const UserItems = () => {
  const [selectedFilter, setSelectedFilter] =
    useState<"" | "Free" | "Swap">("");

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
