import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownProps {
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="border-gray rounded-md border bg-white px-4 py-2 text-base text-black">
          세부 전형 선택
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="ml-36 mt-[-40px] rounded border border-gray-300 bg-white shadow-lg">
          {items.map((item, index) => (
            <DropdownMenu.Item key={index} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              {item}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
