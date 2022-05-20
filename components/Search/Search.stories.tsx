import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Search from "./Search";

export default {
  title: "Component/Search",
  component: Search,

  argTypes: {},
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = () => <Search />;

export const Primary = Template.bind({});
Primary.args = {};
