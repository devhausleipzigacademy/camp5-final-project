// Component to show user items on item page for swapping
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Spinner } from "../Spinner/Spinner";
import Image from "next/image";
import clsx from "clsx";
import Button from "../Button/Button";
import ProductUserListItem from "../ProductUserListItem/ProductUserListItem";
import { Item } from "../../utils/types";
import { getUserItems } from "../../utils/getUserItems";
import { useSession } from "next-auth/react";
import axios from "axios";
import router from "next/router";
import ConfirmDialog from "../ConfirmDialog.tsx/ConfirmDialog";

interface OfferDrawerProps {
  show: boolean;
  offersArray: string[];
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  productId: string;
  owner: string;
}

const OfferDrawer = ({
  show = false,
  offersArray,
  setShowDrawer,
  productId,
  owner,
}: OfferDrawerProps) => {
  const [selected, setSelected] = useState(false);
  {
    /* state for item id */
  }
  const [selID, setSelID] = useState("");
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const session = useSession();
  //@ts-ignore
  let userId = session.data.user.id;

  {
    /* fetch user items */
  }
  async function getItems() {
    let itemFetch = await getUserItems(userId);
    setUserItems(itemFetch);
  }

  useEffect(() => {
    getItems();
  }, []);

  {
    /* get item id and set selected to true */
  }
  function toggleSelect(id: string) {
    setSelected((prev) => !prev);
    setSelID(id);
  }

  {
    /* after confirm dialog */
  }
  const confirmOffer = () => {
    offersArray.push(selID);
    console.log(offersArray);
    offerHandler();
    setShowDrawer(false);
  };

  {
    /* save itemId in offersArray of product and go to tradepage */
  }
  async function offerHandler() {
    try {
      await axios.put(`api/item?updateitem=${productId}`, offersArray);
      console.log("offersArr", offersArray);
    } catch (err) {
      console.error(err);
    }
    router.push({
      pathname: "/trade",
      query: {
        identifier: productId,
        owner: owner,
      },
    });
  }

  if (!userItems) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <ConfirmDialog
          itemId={productId}
          handleItem={confirmOffer}
          open={showDialog}
          setOpen={setShowDialog}
          message="Are you sure you want to swap this item?"
          label="YES"
        />
        <div
          className={clsx(
            show
              ? "absolute h-[calc(100vh-92px)] w-1/3 top-[64px] bg-BG shadow-md rounded-r-md z-10 flex flex-col justify-between px-2 py-4 transition-transform duration-150 ease-out translate-x-0"
              : "absolute h-[calc(100vh-92px)] w-1/3 top-[64px] bg-BG shadow-md flex flex-col z-10 justify-between px-2 py-4 transition-transform duration-150 ease-out -translate-x-full"
          )}
        >
          <div className="flex flex-col space-y-2 justify-between text-secondary-text">
            <p className="font-semibold text-center">My Items</p>
            <div className="h-[1px] bg-BG-text rounded-md opacity-25"></div>
            {userItems.length === 0 && (
              <div className="flex text-center items-center w-full h-[73.5vh] rounded-md">
                <p>Please upload a swappable item.</p>
              </div>
            )}
            {userItems.length > 0 &&
              userItems.map((userItem, i) => (
                <ProductUserListItem
                  key={i}
                  id={userItem.identifier}
                  title={userItem.title}
                  imgSrc={Object.values(userItem.images)[0]}
                  onClick={() => toggleSelect(userItem.identifier)}
                  selected={selID === userItem.identifier ? true : false}
                />
              ))}
          </div>
          <div className="pr-16">
            <Button
              selected={false}
              onClick={() => setShowDialog(true)}
              value={"Offer"}
              type={"submit"}
            />
          </div>
        </div>
      </>
    );
  }
};

export default OfferDrawer;
