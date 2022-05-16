import { Carousel as Slider } from '@trendyol-js/react-carousel';
import Image from "next/image";
// images testing data:
const imgRes = [
    "https://placeimg.com/300/300/any",
    "https://placeimg.com/300/300/animals",
    "https://placeimg.com/300/300/architecture",
    "https://placeimg.com/300/300/nature",
    "https://placeimg.com/300/300/people",
    "https://placeimg.com/300/300/tech"
]

const Carousel = () => {
    return (
        <Slider show={1} slide={1} swiping={true}  >
            {imgRes.map((img, index) => {
                return (
                    <Image
                        key={index}
                        src={img || ""}
                        alt=""
                        layout="responsive"
                        sizes='50vw'
                        height={500}
                        width={500}
                        objectFit="cover"
                    />
                );
            })}
        </Slider>
    )
};

export default Carousel;
