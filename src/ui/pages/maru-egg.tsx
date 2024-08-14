import React from 'react';
import Header from '../components/molecule/header/header';
import useTypeStore from '../../store/type-store';
import ChatCard from '../components/atom/chat-card/chat-card';
import ChatForm from '../components/molecule/chat-form/chat-form';
import useChatStore from '../../store/chat-store';
import PresetButton from '../components/atom/preset/preset-button';

const MaruEgg: React.FC = () => {
  const { setSelectedType, type } = useTypeStore();
  const { messages } = useChatStore();
  const [selectedButton, setSelectedButton] = React.useState<'SUSI' | 'PYEONIP' | 'JEONGSI' | null>(null);

  const handleButtonClick = (selectedType: 'SUSI' | 'PYEONIP' | 'JEONGSI') => {
    setSelectedType(selectedType);
    setSelectedButton(selectedType);
  };

  return (
    <div className="h-lvh bg-background-default">
      <Header type={type} />

      <div className="max-h-screen-minus-header w-full overflow-y-auto px-4 pb-24 pt-16">
        <ChatCard
          content={`안녕하세요 입학처 챗봇 MARU-EGG입니다!  
            궁금하신 내용 안내 도와드리겠습니다.  
            알아보고 싶은 전형을 선택해주세요!`}
          role="system"
        />
        <div className="flex space-x-2">
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
        {type !== null && (
          <ChatCard role="user" content={type === 'SUSI' ? '수시' : type === 'JEONGSI' ? '정시' : '편입'} />
        )}
        {type !== null && (
          <ChatCard
            role="system"
            content={`안녕하세요 입학처 챗봇 MARU-EGG입니다!  
              궁금하신 내용 안내 도와드리겠습니다.
            `}
          />
        )}
        {messages.map((msg, index) => {
          return <ChatCard key={index} content={msg.content} role={msg.role} />;
        })}
      </div>
      {type !== null && (
        <div className="fixed bottom-0 w-full bg-white px-4 py-3">
          <ChatForm type={type} />
        </div>
      )}
    </div>
  );
};

export default MaruEgg;
