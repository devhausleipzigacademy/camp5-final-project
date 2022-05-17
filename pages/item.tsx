import Button from "../components/Button/Button";
import Carousel from "../components/Carousel/Carousel";
import ChatIcon from '../public/chat.svg';



export interface ProductProps {
  imagesArray: string[];
  title: string;
  offerType: "Free" | "Swap";
  owner: string;
  createdAt: string;
  distance: number;
  description: string;
}
export default function ProductPage({ imagesArray, title, offerType, owner, createdAt, distance, description }: ProductProps) {
  return (
    <>
      <div className="w-full h-1/4 py-4 bg-primary text-primary-text text-center">
        HEADER placeholder
      </div>
      <div className="flex-col space-y-2">
        <div className="block w-full">
          <Carousel imagesArray={imagesArray} />
        </div>
        <div className="flex-col px-4 space-y-2" >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl">{title}</p>
            </div>
            <div>
              <Button bgColor={"primary"} text={offerType} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-md"> {`Offered by ${owner}`} </p>
              <p className="text-xs">{`distance ${distance} km`} </p>
              <p className="text-xs">{`posted ${createdAt}`} </p>
            </div>
            <div>
              <button className="text-primary w-10"><ChatIcon /></button>
            </div>
          </div>

          <div>
            <p>
              {description}
            </p>
          </div>

          <div className="fixed bottom-3 right-5 left-5" >
            <Button bgColor={"secondary"} text={"Offer Trade"} py={2} />
          </div>
        </div>
      </div>
    </>
  );
}
