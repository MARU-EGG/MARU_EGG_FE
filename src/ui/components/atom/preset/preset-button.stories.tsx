import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import PresetButton from './preset-button';

const meta = {
  title: 'Example/PresetButton',
  component: PresetButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: () => console.log('Button clicked'),
  },
} satisfies Meta<typeof PresetButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '전형일정',
  },
};

export const Disabled: Story = {
  args: {
    children: '전형일정',
    disabled: true,
  },
};
