import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Inputfield from "./DescriptionInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputfield",
  component: Inputfield,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Inputfield>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Inputfield> = (args) => <Inputfield />;

export const Primary = Template.bind({});
Primary.parameters = {
  nextRouter: {
    asPath: "/",
  },
};

export const Secondary = Template.bind({});
Secondary.parameters = {
  nextRouter: {
    asPath: "/messages",
  },
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
