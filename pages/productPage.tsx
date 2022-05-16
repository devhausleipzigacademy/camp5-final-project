import Carousel from "../components/Carousel/Carousel";

// images testing data:
const imgRes = [
  "https://placeimg.com/300/300/any",
  "https://placeimg.com/300/300/animals",
  "https://placeimg.com/300/300/architecture",
  "https://placeimg.com/300/300/nature",
  "https://placeimg.com/300/300/people",
  "https://placeimg.com/300/300/tech"
]
export default function ProductPage() {
  return (
    <>
      <div className="w-full h-1/4 py-4 bg-primary text-center">Hello World</div>
      <div className="block">
      <Carousel imagesArray={imgRes}/>
      </div>
      
    </>
  );
}
