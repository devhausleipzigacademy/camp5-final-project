import Button from "../../components/Button/Button";
import Carousel from "../../components/Carousel/Carousel";
import ChatIcon from "../../public/chat.svg";
import BackIcon from "../../public/back.svg";
import StarIcon from "../../public/star.svg";
import StarFilledIcon from "../../public/star_filled.svg";
import LocationIcon from "../../public/location.svg";
import { useEffect, useState } from "react";
import { getProduct } from "../../utils/getProduct";
import { Item } from "../../utils/types";
import { useRouter } from "next/router";
import { formatDistance, subDays } from "date-fns";
import Link from "next/link";
import { useSession } from "next-auth/react";
import OfferDrawer from "../../components/OfferDrawer/OfferDrawer";
import axios from "axios";
import ConfirmDialog from "../../components/ConfirmDialog.tsx/ConfirmDialog";

export default function ProductPage(): JSX.Element {
  const session = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  let title = router.asPath.split("title=")[1].split("&")[0];
  let id = router.asPath.split("identifier=")[1].split("&")[0];
  let distance = router.asPath.split("distance=")[1].split("&")[0];
  let owner = router.asPath.split("owner=")[1];
  let userId = session.data.user.id;

  let imagesArray: string[];
  let description;
  let offerType;
  let createdAt;
  let createdAgo;
  let favorited = false;
  let offersArray: string[] = [];

  const [isFavorited, SetIsFavorited] = useState(favorited);
  const [productData, setProductData] = useState<Item | null>(null);
  const [showDrawer, SetShowDrawer] = useState(false);

  async function getProductData(id: string) {
    const item = await getProduct(id);
    setProductData(item);
  }
  useEffect(() => {
    const storedValue = id;
    if (storedValue) {
      getProductData(storedValue);
    }
  }, []);

  if (!productData) {
    return <></>;
  } else {
    title = productData.title;
    description = productData.description;
    offerType = productData.sellType === "SWAP" ? "Swap" : "Free";
    imagesArray = Object.values(productData.images);
    offersArray = productData.requests;
    console.log(`offers: ${offersArray}`);

    createdAt = productData.createdAt;
    createdAgo = formatDistance(
      subDays(new Date(createdAt as string), 0),
      new Date(),
      {
        addSuffix: true,
      }
    );
  }
  // These Handlers are placeholder functions for clicking on the Button onClick functionalities.
  const offerTradeHandler = () => {
    SetShowDrawer((prev) => !prev);
  };

  async function claimHandler() {
    try {
      await axios.put(`api/item?updateitem=${id}&recipient=${userId}`);
      console.log("SUCCESS", userId);
    } catch (err) {
      console.error(err);
    }
    router.push({
      pathname: "/trade",
      query: {
        identifier: id,
        owner: owner,
      },
    });
  }

  const chatHandler = () => {};
  const backHandler = () => {
    const back = {
      pathname: "/",
    };
    return back;
  };
  const locationHandler = () => {};
  const back = backHandler();

  return (
    <div className="flex-col h-[calc(100vh-64px)] overflow-hidden bg-BG">
      <OfferDrawer
        show={showDrawer}
        offersArray={offersArray}
        setShowDrawer={SetShowDrawer}
        productId={id}
        owner={owner}
      />
      <div className="relative block w-full">
        <Carousel imagesArray={imagesArray} />

        <Link href={back.pathname}>
          <a>
            <button
              className="text-BG absolute w-10 left-2 top-2"
              onClick={() => router.push(back)}
            >
              <BackIcon />
            </button>
          </a>
        </Link>

        <button
          onClick={() => SetIsFavorited((fav) => !fav)}
          className="text-BG absolute w-9 top-2 right-2"
        >
          {isFavorited ? <StarFilledIcon /> : <StarIcon />}
        </button>
        <button
          onClick={locationHandler}
          className="text-BG absolute w-9 bottom-4 right-2"
        >
          <LocationIcon />
        </button>
      </div>
      <div className="flex-col h-full px-2 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-xl">{title}</p>
          <div className="flex pl-16">
            <Button
              type="button"
              value={offerType}
              onClick={() => {}}
              selected={false}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-md"> {`Offered by ${owner}`} </p>
            <p className="text-xs">
              {`distance: ${distance.split("%25")[0]} ${
                distance.split("%25")[1]
              }`}
            </p>
            <p className="text-xs">{`posted ${createdAgo}`} </p>
            {/* chat to be implemented at a later version */}
            {/* <button onClick={chatHandler} className="text-primary w-10">
                <ChatIcon />
              </button> */}
          </div>
        </div>
        {/* not sure how to make the description responsive in size */}
        <div className="overflow-y-scroll h-56">{description}</div>
        <div className="flex flex-grow"></div>
        <div className="flex justify-center">
          {offerType === "Free" ? (
            <div className="flex w-full">
              <Button
                onClick={() => setShowDialog(true)}
                selected={false}
                value={"Claim"}
                type={"submit"}
              />
              <ConfirmDialog
                itemId={id}
                handleItem={claimHandler}
                open={showDialog}
                setOpen={setShowDialog}
                message="Are you sure you want to claim this item?"
                label="YES"
              />
            </div>
          ) : (
            <div className="flex w-full">
              <Button
                onClick={offerTradeHandler}
                selected={false}
                value={"Offer Trade"}
                type={"submit"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
