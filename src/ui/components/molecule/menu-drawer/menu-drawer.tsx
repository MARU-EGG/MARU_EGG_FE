import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import PresetButton from '../../atom/preset/preset-button';
import useTypeStore from '../../../../store/type-category-store';
import { ReactComponent as XIcon } from '../../../../assets/X.svg';
import IconButton from '../../atom/icon/icon-button';

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MenuDrawer = ({ open, onClose }: MenuDrawerProps) => {
  const [selectedButton, setSelectedButton] = React.useState<'SUSI' | 'PYEONIP' | 'JEONGSI' | undefined>(undefined);
  const { type } = useTypeStore();

  useEffect(() => {
    setSelectedButton(type);
  }, [type]);
  const handleButtonClick = (selectedType: 'SUSI' | 'PYEONIP' | 'JEONGSI') => {
    setSelectedButton(selectedType);
  };
  const getUrls = () => {
    switch (selectedButton) {
      case 'SUSI':
        return {
          admissionGuideUrl: 'https://iphak.mju.ac.kr/pages/?p=10&mj=01',
          admissionResultsUrl: 'https://iphak.mju.ac.kr/pages/?p=11&b=B_1_2&cate=%EC%88%98%EC%8B%9C',
        };
      case 'PYEONIP':
        return {
          admissionGuideUrl: 'https://iphak.mju.ac.kr/pages/?p=26&mj=04',
          admissionResultsUrl: 'https://iphak.mju.ac.kr/pages/?p=27&b=B_1_2&cate=%ED%8E%B8%EC%9E%85%ED%95%99',
        };
      case 'JEONGSI':
        return {
          admissionGuideUrl: 'https://iphak.mju.ac.kr/pages/?p=16&mj=02',
          admissionResultsUrl: 'https://iphak.mju.ac.kr/pages/?p=17&b=B_1_2&cate=%EC%A0%95%EC%8B%9C',
        };
      default:
        return {
          admissionGuideUrl: 'https://iphak.mju.ac.kr/pages/?p=10&mj=01',
          admissionResultsUrl: 'https://iphak.mju.ac.kr/pages/?p=11&b=B_1_2&cate=%EC%88%98%EC%8B%9C',
        };
    }
  };

  const { admissionGuideUrl, admissionResultsUrl } = getUrls();

  return (
    <Drawer
      placement="bottom"
      closable={false}
      open={open}
      onClose={onClose}
      height="260px"
      rootClassName="absolute mx-auto my-auto desktop:max-w-[390px] desktop:max-h-[780px] desktop:rounded-t-3xl desktop:rounded-b-3xl mobile:max-w-full mobile:max-h-full mobile:rounded-none mobile:shadow-none"
      rootStyle={{ width: '100%', overflow: 'hidden' }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex w-full justify-between">
          <div className="mb-2 space-x-2">
            <PresetButton onClick={() => handleButtonClick('SUSI')} isSelected={selectedButton === 'SUSI'}>
              수시
            </PresetButton>
            <PresetButton onClick={() => handleButtonClick('PYEONIP')} isSelected={selectedButton === 'PYEONIP'}>
              편입
            </PresetButton>
            <PresetButton onClick={() => handleButtonClick('JEONGSI')} isSelected={selectedButton === 'JEONGSI'}>
              정시
            </PresetButton>
          </div>
          <IconButton onClick={onClose}>
            <XIcon className="rounded-full bg-gray-100" />
          </IconButton>
        </div>
      </div>
      <div
        onClick={() => window.open('https://iphak.mju.ac.kr/pages/?p=33&b=B_1_5', '_blank', 'noopener, noreferrer')}
        className="w-full cursor-pointer p-2 text-start font-pretendard text-sm hover:rounded-lg hover:bg-[#F4F4F4]"
      >
        FAQ 바로가기
      </div>
      <div
        onClick={() => window.open(admissionResultsUrl, '_blank', 'noopener, noreferrer')}
        className="w-full cursor-pointer p-2 text-start font-pretendard text-sm hover:rounded-lg hover:bg-[#F4F4F4]"
      >
        입시결과 바로가기
      </div>
      <div
        onClick={() => window.open(admissionGuideUrl, '_blank', 'noopener, noreferrer')}
        className="w-full cursor-pointer p-2 text-start font-pretendard text-sm hover:rounded-lg hover:bg-[#F4F4F4]"
      >
        모집요강 바로가기
      </div>
      <div className="mt-2 space-y-2">
        <div className="flex justify-between px-2 font-pretendard text-xs text-[#767676]">
          <p className="font-medium">학생부교과, 실기/실적위주, 기타</p>
          <p>입학관리팀: 02)300-1799,1800</p>
        </div>
        <div className="flex justify-between px-2 font-pretendard text-xs text-[#767676]">
          <p className="font-medium">학생부종합 문의</p>
          <p>인재발굴팀: 02)300-1797,1844</p>
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
