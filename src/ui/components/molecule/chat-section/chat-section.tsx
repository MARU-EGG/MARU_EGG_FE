// src/ui/components/organism/chat-section/chat-section.tsx
import * as React from 'react';
import ChatCard from '../../atom/chat-card/chat-card';
import PresetButton from '../../atom/preset/preset-button';
import useTypeStore from '../../../../store/type-category-store';
import useChatStore from '../../../../store/chat-store';
import useChatSection from '../../../../hooks/use-chat-section.hooks';
import { useTypeDisabledStore } from '../../../../store/type-disabled-store';
import { getTypeStatus } from '../../../../api/admin/question-type-status/get-type-status';

const ChatSection: React.FC = () => {
  const { type, category } = useTypeStore();
  const { messages } = useChatStore();
  const { selectedTypeButton, selectedCategoryButton, handleTypeButtonClick, handleCategoryButtonClick } =
    useChatSection();
  const { activeSusi, activeJeongsi, activePyeonip, setSusiDisabled, setJeongsiDisabled, setPyeonipDisabled } =
    useTypeDisabledStore();

  const messageEndRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedCategoryButton]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTypeStatus();

        response.forEach((item: { type: 'SUSI' | 'JEONGSI' | 'PYEONIP'; isActivated: boolean }) => {
          if (item.type === 'SUSI') {
            setSusiDisabled(item.isActivated);
          } else if (item.type === 'JEONGSI') {
            setJeongsiDisabled(item.isActivated);
          } else if (item.type === 'PYEONIP') {
            setPyeonipDisabled(item.isActivated);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-h-100vh w-full overflow-y-auto px-4 pb-24 pt-16">
      <ChatCard
        content={`안녕하세요 입학처 챗봇 MARU-EGG입니다!  
          궁금하신 내용 안내 도와드리겠습니다.  
          알아보고 싶은 전형을 선택해주세요!`}
        role="system"
      />
      <div className="flex space-x-2">
        <PresetButton
          disabled={activeSusi}
          onClick={() => handleTypeButtonClick('SUSI')}
          isSelected={selectedTypeButton === 'SUSI'}
        >
          수시
        </PresetButton>
        <PresetButton
          disabled={activeJeongsi}
          onClick={() => handleTypeButtonClick('JEONGSI')}
          isSelected={selectedTypeButton === 'JEONGSI'}
        >
          정시
        </PresetButton>
        <PresetButton
          disabled={activePyeonip}
          onClick={() => handleTypeButtonClick('PYEONIP')}
          isSelected={selectedTypeButton === 'PYEONIP'}
        >
          편입
        </PresetButton>
      </div>
      {type !== undefined && (
        <ChatCard role="user" content={type === 'SUSI' ? '수시' : type === 'JEONGSI' ? '정시' : '편입'} />
      )}
      {type !== undefined && (
        <>
          <ChatCard content={`알고싶은 내용을 선택해주세요`} role="system" />
          <div className="flex flex-col items-start space-y-2">
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
