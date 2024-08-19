import React from 'react';
import Header from '../components/molecule/header/header';
import useTypeStore from '../../store/type-category-store';
import ChatCard from '../components/atom/chat-card/chat-card';
import ChatForm from '../components/molecule/chat-form/chat-form';
import useChatStore from '../../store/chat-store';
import PresetButton from '../components/atom/preset/preset-button';

const MaruEgg: React.FC = () => {
  const { setSelectedType, type, setSelectedCategory, category } = useTypeStore();
  const { messages } = useChatStore();
  const [selectedTypeButton, setSelectedTypeButton] = React.useState<'SUSI' | 'PYEONIP' | 'JEONGSI' | undefined>(
    undefined,
  );
  const [selectedCategoryButton, setSelectedCategoryButton] = React.useState<
    undefined | 'ADMISSION_GUIDELINE' | 'PASSING_RESULT' | 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST'
  >(undefined);

  const handleTypeButtonClick = (selectedType: 'SUSI' | 'PYEONIP' | 'JEONGSI') => {
    setSelectedType(selectedType);
    setSelectedTypeButton(selectedType);
  };

  const handleCategoryButtonClick = (
    selectedCategory: 'ADMISSION_GUIDELINE' | 'PASSING_RESULT' | 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST',
  ) => {
    setSelectedCategory(selectedCategory);
    setSelectedCategoryButton(selectedCategory);
  };
  return (
    <div className="flex h-svh items-center justify-center bg-gray-100">
      <div className="relative flex h-[780px] w-[390px] rounded-2xl border border-gray-200 bg-background-default shadow-2xl">
        <Header type={type} />
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
            <PresetButton
              onClick={() => handleTypeButtonClick('PYEONIP')}
              isSelected={selectedTypeButton === 'PYEONIP'}
            >
              편입
            </PresetButton>
            <PresetButton
              onClick={() => handleTypeButtonClick('JEONGSI')}
              isSelected={selectedTypeButton === 'JEONGSI'}
            >
              정시
            </PresetButton>
          </div>
          {type !== undefined && (
            <ChatCard role="user" content={type === 'SUSI' ? '수시' : type === 'JEONGSI' ? '정시' : '편입'} />
          )}
          {type !== undefined && (
            <>
              <ChatCard content={`알고싶은 내용을 선택해주세요`} role="system" />
              <div className="flex flex-wrap space-x-2 space-y-1">
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
                <PresetButton
                  onClick={() => handleCategoryButtonClick('INTERVIEW_PRACTICAL_TEST')}
                  isSelected={selectedCategoryButton === 'INTERVIEW_PRACTICAL_TEST'}
                >
                  실기관련
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
                    : category === 'PAST_QUESTIONS'
                      ? '면접 등 기출문제'
                      : '실기관련'
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
        </div>
        {type !== undefined && category !== undefined && (
          <div className="absolute bottom-0 w-full rounded-bl-2xl rounded-br-2xl bg-white px-3 py-3">
            <ChatForm type={type} category={category} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaruEgg;
