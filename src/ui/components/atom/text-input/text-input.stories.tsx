import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './text-input';

const meta = {
  title: 'Example/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  args: {
    onValueChange: (value: string) => console.log(value),
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter text here...',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: '마루에그에게 물어보고싶어요',
  },
};
