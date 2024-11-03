import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown from './dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: ['일반', '학사', '농어촌학생', '특성화고교', '재외국민', '특성화고등졸재직자'],
};
