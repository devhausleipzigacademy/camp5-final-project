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

interface ProductProps {
  imagesArray: string[]
  title: string
  offerType: 'Free' | 'Swap'
  owner: string
  createdAt: Date
  distance: number
  description: string
}
export default function ProductPage() {
  return (
    <>
      <div className="w-full h-1/4 py-4 bg-primary text-center">HEADER placeholder</div>
      <div className="flex-col p-3">

        <div className="block p-5 w-full h-[25%] m-auto" >
          <Carousel imagesArray={imgRes}  />
        </div>

        <div className="flex justify-between">
          <div>
            <h3>Product name</h3>
          </div>
          <div>
            <button>Swap</button>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <h4>offered by john duo</h4>
          </div>
          <div>
            <button>Chat icon</button>
          </div>
        </div>

        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iusto vitae porro accusamus repudiandae quis odit sunt tempora vero,
            quidem veniam fugiat atque eligendi ipsa sequi autem? Ipsum, tempore? Veritatis.
          </p>
        </div>

        <div>
          <button> Offer Trade </button>
        </div>

      </div>
    </>
  );
}
