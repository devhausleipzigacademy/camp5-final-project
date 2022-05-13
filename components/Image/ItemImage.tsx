import { useState } from "react";
import Image from "next/image";


interface ImgProps {
  src: string[];
  fav: boolean;
}

const ItemImage = ({ src, fav }: ImgProps) => {
  const [images, setImages] = useState<string[]>(src);
  const [counter, setCounter] = useState<number>(0);

  const slideHandler = (dir: String) => {
    switch (dir) {
      case "Left":
        if (counter > 0) {
          setCounter((prev) => prev - 1);
        } else {
          setCounter(images.length - 1)
        }
        break;
      case "Right":
        if (counter < images.length - 1) {
          setCounter((prev) => prev + 1);
        } else {
          setCounter(0)

        }
        break;
    }
  }

  return (
    <>
      <button onClick={() => slideHandler("Left")}>{"<"}</button>
      <Image
        alt=""
        src={images[counter]}
        layout={"responsive"}
        width={75}
        height={75}
      ></Image>
      <button onClick={() => slideHandler("Right")}>{">"}</button>
    </>
  );
};

export default ItemImage;
