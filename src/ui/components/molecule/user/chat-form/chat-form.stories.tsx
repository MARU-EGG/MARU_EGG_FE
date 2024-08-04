import type { Meta, StoryObj } from '@storybook/react';
import ChatForm from './chat-form';
import React from 'react';

const meta = {
  title: 'Example/ChatForm',
  component: ChatForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'SUSI',
  },
} satisfies Meta<typeof ChatForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'SUSI',
    category: 'PAST_QUESTIONS',
  },
};
