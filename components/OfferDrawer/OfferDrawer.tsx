import { MouseEventHandler, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import Image from "next/image";
import clsx from "clsx";
import Button from "../Button/Button";
import ProductUserListItem from "../ProductUserListItem/ProductUserListItem";

interface OfferDrawerProps {
  show: boolean;
}

// hardcoded items fetch. to be replaced with user specific fetch
const myItems = [
  {
    identifier: "629e6538-ce13-4b8f-9101-f46f82ea8dbd",
    title: "Tie",
    images: [
      "https://images.unsplash.com/photo-1589756823695-278bc923f962?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
    ],
    description: "nice animals, only used at wedding",
    userId: "aa5277db-32a5-4355-8835-5896dfac5a1d",
    sellType: "SWAP",
    createdAt: "2022-05-25T07:45:38.564Z",
    catId: "d199b4ee-6f22-45d3-afae-93dea622c79f",
  },
  {
    identifier: "20c9117d-231d-4fd1-b070-e08bceec8827",
    title: "Shoe",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
    ],
    description: "mint condition, unused",
    userId: "35ac3939-f9fe-4900-b6eb-5639834b6fd2",
    sellType: "FREE",
    createdAt: "2022-05-25T07:45:38.555Z",
    catId: "0b83b53b-5d10-4b22-9b3f-c748136b54e0",
  },
];

const OfferDrawer = ({ show = false }: OfferDrawerProps) => {
  const [selected, setSelected] = useState(false);
  const [selID, setSelID] = useState("");

  function toggleSelect(id: string) {
    setSelected((prev) => !prev);
    setSelID(id);
  }

  const confirmOffer = () => {
    console.log(selID);
  };

  return (
    <>
      <div
        className={clsx(
          show
            ? "absolute h-[calc(100vh-92px)] w-1/3 top-[64px] bg-BG shadow-md rounded-r-md z-10 flex flex-col justify-between px-2 py-4 transition-transform duration-150 ease-out translate-x-0"
            : "absolute h-[calc(100vh-92px)] w-1/3 top-[64px] bg-BG shadow-md z-10 flex flex-col justify-between px-2 py-4 transition-transform duration-150 ease-out -translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-2 justify-between text-secondary-text">
          {myItems.length === 0 && (
            <div className="flex text-center items-center w-full h-[73.5vh] rounded-md">
              <Spinner />
            </div>
          )}
          <p className="font-semibold text-center">My Items</p>
          <div className="h-[1px] bg-BG-text rounded-md opacity-25"></div>

          {myItems.length > 0 &&
            myItems.map((myItems, i) => (
              <ProductUserListItem
                key={i}
                id={myItems.identifier}
                title={myItems.title}
                imgSrc={myItems.images[0]}
                onClick={() => toggleSelect(myItems.identifier)}
                selected={selID === myItems.identifier ? true : false}
              />
            ))}
        </div>
        <div className="pr-16">
          <Button
            selected={false}
            onClick={confirmOffer}
            value={"Offer"}
            type={"submit"}
          />
        </div>
      </div>
    </>
  );
};

export default OfferDrawer;
