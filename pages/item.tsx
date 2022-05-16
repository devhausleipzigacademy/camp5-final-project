import Carousel from "../components/Carousel/Carousel";
import ItemImage from "../components/Image/ItemImage";

const imgArray = [
  "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikipedia_logo_593.jpg",
  "https://upload.wikimedia.org/wikipedia/en/7/78/Small_scream.png",
];

export default function Item() {
  return (
    <>
      <div className="w-full h-1/4 py-4 bg-primary text-center">Hello World</div>
      <div className="block">
      <Carousel />
      {/* <ItemImage src={imgArray} fav={false} /> */}

      </div>
    </>
  );
}
