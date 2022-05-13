import { useState } from "react";

interface ImgProps {
  src: string[];
  fav: boolean;
}

const ItemImage = ({ src, fav }: ImgProps) => {
  const [images, setImages] = useState<String[]>([
    "https://images.pexels.com/photos/11953263/pexels-photo-11953263.jpeg?cs=srgb&dl=pexels-ruslan-sikunov-11953263.jpg&fm=jpg",
    "https://www.pexels.com/photo/bouquet-of-flowers-placed-in-vase-6069736/",
  ]);
  return <Image src={src}></Image>;
};

export default ItemImage;
