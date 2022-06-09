import Button from "../../components/Button/Button";
import Carousel from "../../components/Carousel/Carousel";
import ChatIcon from "../../public/chat.svg";
import BackIcon from "../../public/back.svg";
import StarIcon from "../../public/star.svg";
import StarFilledIcon from "../../public/star_filled.svg";
import LocationIcon from "../../public/location.svg";
import { useEffect, useState } from "react";
import { getProduct } from "../../utils/getProduct";
import { Item } from "../../utils/types";
import ProductPage from "./[identifier]";
import OfferDrawer from "../../components/OfferDrawer/offerDrawer";

export interface ProductProps {
  imagesArray: string[];
  title: string;
  offerType: string;
  owner: string;
  createdAt: string;
  distance: number;
  description: string;
  favorited: boolean;
  id: string;
}

export default function ItemIndex() {
  return (
    <>
      <ProductPage />
    </>
  );
}
