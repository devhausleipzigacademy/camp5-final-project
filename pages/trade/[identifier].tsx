import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { getProduct } from "../../utils/getProduct";
import { Item } from "../../utils/types";

export default function TradeItem(): JSX.Element {
  const [productData, setProductData] = useState<Item | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  let id = router.asPath.split("identifier=")[1].split("&")[0];
  let owner = router.asPath.split("owner=")[1].split("&")[0];
  let imagesArray: string[];
  let title;

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
    imagesArray = Object.values(productData.images);
  }
  return (
    <div className="flex justify-center">
      {productData.sellType === "FREE" ? (
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl pt-10">Congratulations!</h1>
          {/* <div className="h-64 w-64 overflow-clip bg-cover"> */}
          <img src={imagesArray[0]} alt="Your item!" className="h-80 w-64" />
          {/* </div> */}
          <h3 className="text-xl pl-4">{title} is yours now</h3>
          <p className="self-center">thank you {owner}</p>
          <div className="flex px-2">
            <Button
              value={"cool!"}
              onClick={() => router.push("/")}
              selected={false}
              type={"submit"}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-64px)] items-center justify-around">
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl w-64 text-center">
              Nice, you have requested to swap with {owner}
            </h3>
            <img
              src={imagesArray[0]}
              alt="Your desired item!"
              className="h-80 w-64 rounded-md"
            />
            <p className="self-center text-lg">{title}</p>
          </div>
          <div className="flex px-2">
            <Button
              value={"swap some more"}
              onClick={() => router.push("/")}
              selected={false}
              type={"submit"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
