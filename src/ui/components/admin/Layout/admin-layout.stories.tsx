import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin-layout';

const meta: Meta = {
  title: 'Layouts/AdminLayout',
  component: AdminLayout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/admin/setting/file']}>
        <Routes>
          <Route path="/admin/*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn = (args) => <AdminLayout {...args} />;

export const Default = Template.bind({});
Default.args = {};
