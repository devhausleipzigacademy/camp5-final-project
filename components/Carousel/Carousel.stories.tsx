import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Carousel from "./Carousel";

export default {
  title: "Component/Carousel",
  component: Carousel,

  argTypes: {},
} as ComponentMeta<typeof Carousel>;

const imgRes = [
  "https://placeimg.com/300/300/any",
  "https://placeimg.com/300/300/animals",
  "https://placeimg.com/300/300/architecture",
  "https://placeimg.com/300/300/nature",
  "https://placeimg.com/300/300/people",
  "https://placeimg.com/300/300/tech",
];

const Template: ComponentStory<typeof Carousel> = (imagesArray) => (
  <Carousel imagesArray={imgRes} />
);

export const Default = Template.bind({});
