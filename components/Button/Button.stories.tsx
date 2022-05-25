import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Component/Button",
  component: Button,

  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  bgColor: "primary",
};
export const Secondary = Template.bind({});
Secondary.args = {
  bgColor: "secondary",
};
