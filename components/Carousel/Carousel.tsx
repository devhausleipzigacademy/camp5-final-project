import { Carousel as Slider } from "@trendyol-js/react-carousel";
import Image from "next/image";
interface CaroProps {
  imagesArray: string[];
}
const Carousel = ({ imagesArray }: CaroProps) => {
  // https://trendyol.github.io/react-carousel/docs/carousel/
  return (
    <Slider show={1} slide={1} swiping={true}>
      {imagesArray.map((img, index) => {
        return (
          <Image
            key={index}
            src={img || ""}
            alt=""
            layout="intrinsic"
            // sizes="100vw"
            height={360}
            width={640}
            objectFit="cover"
          />
        );
      })}
    </Slider>
  );
};

export default Carousel;
