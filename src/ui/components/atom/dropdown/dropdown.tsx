import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface DropdownProps {
  type: 'SUSI' | 'JEONGSI' | 'PYEONIP';
  items: { middleName: string; lastNames: string[] }[];
}

const Dropdown: React.FC<DropdownProps> = ({ type, items }) => {
  return (
    <DropdownMenu.Root open>
      <DropdownMenu.Trigger asChild>
        <button style={{ display: 'none' }} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="rounded border border-gray-300 bg-white shadow-lg">
          {type === 'PYEONIP'
            ? // 편입의 경우, 한 번에 전체 목록 표시
              items.map((item, index) => (
                <DropdownMenu.Item key={index} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  {item.middleName}
                </DropdownMenu.Item>
              ))
            : // 수시, 정시의 경우, 중간 이름을 상위 메뉴로, 마지막 이름을 하위 메뉴로 표시
              items.map((item, index) => (
                <DropdownMenu.Sub key={index}>
                  <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100">
                    {item.middleName}
                    <ChevronRightIcon />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent className="rounded border border-gray-300 bg-white shadow-lg">
                      {item.lastNames.map((lastName, subIndex) => (
                        <DropdownMenu.Item key={subIndex} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                          {lastName}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>
              ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
