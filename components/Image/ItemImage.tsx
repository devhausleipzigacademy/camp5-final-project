import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
  EmblaEventType,
} from "embla-carousel";

interface ImgProps {
  src: string[];
  fav: boolean;
}

const ItemImage = ({ src, fav }: ImgProps) => {
  const [images, setImages] = useState<string[]>(src);
  const [counter, setCounter] = useState<number>(0);
  const slideHandler = (dir: String) => {
    console.log(dir, counter);
      switch (dir) {
        case "Left":
          console.log(dir, counter);
          setCounter((prev) => {counter === 0 : setCounter(0) ? prev - 1});
          break;
        case "Right":
          console.log(dir, counter);
          console.log(src);
          setCounter((prev) => prev + 1);
          break;
      }
    }
  };
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
