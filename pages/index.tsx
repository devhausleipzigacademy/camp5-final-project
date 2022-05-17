import type { NextPage } from "next";
import ProductPage from "./item";
import { formatDistance, subDays } from "date-fns";
import { ProductProps } from "./item";
// images testing data:
const imgRes = [
  "https://placeimg.com/640/360/any",
  "https://placeimg.com/640/360/animals",
  "https://placeimg.com/640/360/architecture",
  "https://placeimg.com/640/360/nature",
  "https://placeimg.com/640/360/people",
  "https://placeimg.com/640/360/tech",
];

const ProductPropsTEST: ProductProps = {
  imagesArray: imgRes,
  title: "Camera",
  offerType: "Free",
  owner: "Dean W.",
  createdAt: formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
  }),
  distance: 12,
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti porro exercitationem rerum assumenda atque perferendis ipsa, ullam maiores pariatur natus iste. Harum dolor dignissimos animi impedit praesentium, sapiente mollitia optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti porro exercitationem rerum assumenda atque perferendis ipsa, ullam maiores pariatur natus iste. Harum dolor dignissimos animi impedit praesentium, sapiente mollitia optio.",
  favorited: false,
};

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full h-[50px] py-4 bg-primary text-primary-text text-center">
        HEADER placeholder
      </div>
      <ProductPage {...ProductPropsTEST} />
    </>
  );
};

export default Home;
