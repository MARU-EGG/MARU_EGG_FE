import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SlideMenu from './slide-menu';
import { MenuProps } from 'antd';
import { JSX } from 'react/jsx-runtime';

const meta: Meta = {
  title: 'Components/SlideMenu',
  component: SlideMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/admin/question/list']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn = (args: JSX.IntrinsicAttributes & MenuProps) => <SlideMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  mode: 'inline',
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  mode: 'inline',
  inlineCollapsed: true,
};
