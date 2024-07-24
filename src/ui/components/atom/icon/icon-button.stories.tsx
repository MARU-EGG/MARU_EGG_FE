import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import IconButton from './icon-button';
import { ReactComponent as MenuIcon } from '../../../../assets/Menu.svg';
import { ReactComponent as SendIcon } from '../../../../assets/Send.svg';
import { ReactComponent as XIcon } from '../../../../assets/X.svg';
import { ReactComponent as RefreshIcon } from '../../../../assets/Refresh.svg';

const meta = {
  title: 'Example/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: () => console.log('Button clicked'),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <MenuIcon />, // Menu.svg 사용
  },
};

export const Disabled: Story = {
  args: {
    children: <MenuIcon />, // Menu.svg 사용
    disabled: true,
  },
};

// XIcon 사용 스토리
export const WithXIcon: Story = {
  args: {
    children: <XIcon />, // X.svg 사용
  },
};

// SendIcon 사용 스토리
export const WithSendIcon: Story = {
  args: {
    children: <SendIcon />, // Send.svg 사용
  },
};

// RefreshIcon 사용 스토리
export const WithRefreshIcon: Story = {
  args: {
    children: <RefreshIcon />, // Refresh.svg 사용
  },
};
