import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown from './dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['SUSI', 'JEONGSI', 'PYEONIP'],
    },
  },
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const SUSI = Template.bind({});
SUSI.args = {
  type: 'SUSI',
  items: [
    {
      middleName: '학생부교과',
      lastNames: ['학교장추천', '교과면접', '기회균형', '특성화고교', '만학도', '특성화고등졸재직자', '특수교육대상자'],
    },
    {
      middleName: '학생부종합',
      lastNames: ['명지인재면접', '명지인재서류', '크리스천리더', '사회적배려대상자', '농어촌학생'],
    },
    {
      middleName: '실기/실적',
      lastNames: ['실기우수자', '특기자-문학/체육'],
    },
  ],
};

export const JEONGSI = Template.bind({});
JEONGSI.args = {
  type: 'JEONGSI',
  items: [
    {
      middleName: '수능',
      lastNames: ['일반-가/나/다', '실기-가/나/다', '농어촌학생', '특성화고교'],
    },
    {
      middleName: '실기/실적',
      lastNames: ['실기우수자'],
    },
    {
      middleName: '학생부교과',
      lastNames: ['만학도', '특성화고등졸재직자'],
    },
  ],
};

export const PYEONIP = Template.bind({});
PYEONIP.args = {
  type: 'PYEONIP',
  items: [
    { middleName: '일반', lastNames: [] },
    { middleName: '학사', lastNames: [] },
    { middleName: '농어촌학생', lastNames: [] },
    { middleName: '특성화고교', lastNames: [] },
    { middleName: '재외국민', lastNames: [] },
    { middleName: '특성화고등졸재직자', lastNames: [] },
  ],
};
