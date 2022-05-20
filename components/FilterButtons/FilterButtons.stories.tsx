import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FilterButtons from "./FilterButtons";

export default {
  title: "Component/FilterButtons",
  component: FilterButtons,

  argTypes: {},
} as ComponentMeta<typeof FilterButtons>;

const Template: ComponentStory<typeof FilterButtons> = (args) => (
  <FilterButtons {...args} />
);
