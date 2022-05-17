import Button from "../components/Button/Button";
import Carousel from "../components/Carousel/Carousel";
import ChatIcon from '../public/chat.svg';


// images testing data:
const imgRes = [
  "https://placeimg.com/640/360/any",
  "https://placeimg.com/640/360/animals",
  "https://placeimg.com/640/360/architecture",
  "https://placeimg.com/640/360/nature",
  "https://placeimg.com/640/360/people",
  "https://placeimg.com/640/360/tech",
];

interface ProductProps {
  imagesArray: string[];
  title: string;
  offerType: "Free" | "Swap";
  owner: string;
  createdAt: Date;
  distance: number;
  description: string;
}
export default function ProductPage() {
  return (
    <>
      <div className="w-full h-1/4 py-4 bg-primary text-primary-text text-center">
        HEADER placeholder
      </div>
      <div className="flex-col space-y-2">
        <div className="block w-full">
          <Carousel imagesArray={imgRes} />
        </div>
        <div className="flex-col px-4 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl">Super Hype Camera</p>
            </div>
            <div>
              <Button bgColor={"primary"} text={"Swap"} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-md">offered by john duo</p>
              <p className="text-xs">distance 2 km</p>
              <p className="text-xs">posted 2 days ago</p>
            </div>
            <div>
              <button className="text-primary w-10"><ChatIcon /></button>
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              iusto vitae porro accusamus repudiandae quis odit sunt tempora
              vero, quidem veniam fugiat atque eligendi ipsa sequi autem? Ipsum,
              tempore? Veritatis.
            </p>
            <div className="min-h-full grow"></div>
          </div>
          <div>
            <Button bgColor={"secondary"} text={"Offer Trade"} py={2} />
          </div>
        </div>
      </div>
    </>
  );
}
