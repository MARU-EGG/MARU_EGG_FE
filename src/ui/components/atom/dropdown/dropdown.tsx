import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useDetailTypePrompt } from '../../../../hooks/use-detail-type-prompt.hooks';
import { useUserDetailTypeStore } from '../../../../store/user-detail-type-store';
import usePresetButton from '../../../../hooks/use-preset-button.hooks';

interface DropdownProps {
  type: 'SUSI' | 'JEONGSI' | 'PYEONIP';
  items: { middleName: string; lastNames: string[] }[];
}

const Dropdown: React.FC<DropdownProps> = ({ type }) => {
  const { itemList: items } = useDetailTypePrompt();
  const { setSelectedName } = useUserDetailTypeStore();
  const { handleDetailTypeButtonClick } = usePresetButton();

  const handleNameClick = (name: string) => {
    setSelectedName(name);
    handleDetailTypeButtonClick(name);
  };

  return (
    <DropdownMenu.Root open>
      <DropdownMenu.Trigger asChild>
        <button style={{ display: 'hidden' }}></button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="mt-[-18px] min-w-[140px] rounded-md border border-gray-300 bg-white"
          align="start"
        >
          {type === 'PYEONIP'
            ? // 편입의 경우, 한 번에 전체 목록 표시
              items.map((item, index) => (
                <DropdownMenu.Item
                  key={index}
                  className="cursor-pointer rounded-md px-2 py-2 hover:bg-gray-100"
                  onClick={() => handleNameClick(item.middleName)}
                >
                  {item.middleName}
                </DropdownMenu.Item>
              ))
            : // 수시, 정시의 경우, 중간 이름을 상위 메뉴로, 마지막 이름을 하위 메뉴로 표시
              items.map((item, index) => (
                <DropdownMenu.Sub key={index}>
                  <DropdownMenu.SubTrigger className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2 hover:rounded-md hover:bg-gray-100">
                    {item.middleName}
                    <ChevronRightIcon />
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent className="rounded-md border border-gray-300 bg-white shadow-lg">
                      {item.lastNames.map((lastName, subIndex) => (
                        <DropdownMenu.Item
                          key={subIndex}
                          className="cursor-pointer px-4 py-2 hover:rounded-md hover:bg-gray-100"
                          onClick={() => handleNameClick(lastName)}
                        >
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
