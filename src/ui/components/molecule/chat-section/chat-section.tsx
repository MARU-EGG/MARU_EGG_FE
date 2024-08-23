// src/ui/components/organism/chat-section/chat-section.tsx
import React, { useEffect, useRef } from 'react';
import ChatCard from '../../atom/chat-card/chat-card';
import PresetButton from '../../atom/preset/preset-button';
import useTypeStore, { TypeCategoryState } from '../../../../store/type-category-store';
import useChatStore from '../../../../store/chat-store';
import useChatSection from '../../../../hooks/use-chat-section.hooks';

const ChatSection: React.FC = () => {
  const { type, category } = useTypeStore();
  const { messages } = useChatStore();
  const { selectedTypeButton, selectedCategoryButton, handleTypeButtonClick, handleCategoryButtonClick } =
    useChatSection();

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedCategoryButton]);

  return (
    <div className="max-h-screen-minus-header w-full overflow-y-auto px-4 pb-24 pt-16">
      <ChatCard
        content={`안녕하세요 입학처 챗봇 MARU-EGG입니다!  
          궁금하신 내용 안내 도와드리겠습니다.  
          알아보고 싶은 전형을 선택해주세요!`}
        role="system"
      />
      <div className="flex space-x-2">
        <PresetButton onClick={() => handleTypeButtonClick('SUSI')} isSelected={selectedTypeButton === 'SUSI'}>
          수시
        </PresetButton>
        <PresetButton onClick={() => handleTypeButtonClick('PYEONIP')} isSelected={selectedTypeButton === 'PYEONIP'}>
          편입
        </PresetButton>
        <PresetButton onClick={() => handleTypeButtonClick('JEONGSI')} isSelected={selectedTypeButton === 'JEONGSI'}>
          정시
        </PresetButton>
      </div>
      {type !== undefined && (
        <ChatCard role="user" content={type === 'SUSI' ? '수시' : type === 'JEONGSI' ? '정시' : '편입'} />
      )}
      {type !== undefined && (
        <>
          <ChatCard content={`알고싶은 내용을 선택해주세요`} role="system" />
          <div className="flex w-2/5 flex-wrap space-y-2">
            <PresetButton
              onClick={() => handleCategoryButtonClick('ADMISSION_GUIDELINE')}
              isSelected={selectedCategoryButton === 'ADMISSION_GUIDELINE'}
            >
              모집관련내용
            </PresetButton>
            <PresetButton
              onClick={() => handleCategoryButtonClick('PASSING_RESULT')}
              isSelected={selectedCategoryButton === 'PASSING_RESULT'}
            >
              전년도 입시결과
            </PresetButton>
            <PresetButton
              onClick={() => handleCategoryButtonClick('PAST_QUESTIONS')}
              isSelected={selectedCategoryButton === 'PAST_QUESTIONS'}
            >
              면접등 기출문제
            </PresetButton>
          </div>
        </>
      )}

      {category !== undefined && (
        <ChatCard
          role="user"
          content={
            category === 'ADMISSION_GUIDELINE'
              ? '모집관련내용'
              : category === 'PASSING_RESULT'
                ? '전년도 입시결과'
                : '면접 등 기출문제'
          }
        />
      )}
      {type !== undefined && category !== undefined && (
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
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default ChatSection;
