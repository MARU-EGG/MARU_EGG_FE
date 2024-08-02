import React from 'react';
import Header from '../components/molecule/user/header/header';
import useTypeStore from '../../store/type-store';
import ChatCard from '../components/atom/chat-card/chat-card';
import ChatForm from '../components/molecule/user/chat-form/chat-form';
import useChatStore from '../../store/chat-store';

const MaruEgg: React.FC = () => {
  const { setSelectedType, type } = useTypeStore();
  const { messages } = useChatStore();
  const handleButtonClick = (selectedType: 'SUSI' | 'PYEONIP' | 'JEONGSI') => {
    setSelectedType(selectedType);
  };

  return (
    <div className="h-full min-w-[360px] bg-background-default">
      <Header type={type} />

      <div className="w-full px-4 pb-24 pt-16">
        <ChatCard
          content={`안녕하세요 입학처 챗봇 MARU-EGG입니다!  
            궁금하신 내용 안내 도와드리겠습니다.  
            알아보고 싶은 전형을 선택해주세요!`}
          role="system"
        />
        <button onClick={() => handleButtonClick('SUSI')}>Select SUSI</button>
        <button onClick={() => handleButtonClick('PYEONIP')}>Select PYEONIP</button>
        <button onClick={() => handleButtonClick('JEONGSI')}>Select JEONGSI</button>
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
