import * as React from 'react';
import useChatStore from '../../../store/chat-store';
import PresetButton from '../atom/preset/preset-button';
import usePresetButton from '../../../hooks/use-preset-button.hooks';

export const QuestionPresetButtons = () => {
  const { lastReference, referenceButtonDisabled } = useChatStore();
  const { handleReferenceButtonClick, handleButtonClick } = usePresetButton();
  const handleReultButtonClick = (content: string) => {
    handleButtonClick(content, 'PASSING_RESULT');
  };

  return (
    <div className="grid w-full grid-cols-1 gap-2 mobile:w-2/3 mobile:grid-cols-1 desktop:grid desktop:w-full desktop:grid-cols-2 desktop:gap-2">
      {!referenceButtonDisabled && (
        <PresetButton onClick={() => handleReferenceButtonClick(lastReference)}>👆 출처를 알고싶어요</PresetButton>
      )}
      <PresetButton onClick={() => handleButtonClick('전형일정')}>전형일정</PresetButton>
      <PresetButton onClick={() => handleButtonClick('면접 유의사항')}>면접유의사항</PresetButton>
      <PresetButton onClick={() => handleButtonClick('제출서류 유의사항')}>제출서류</PresetButton>
      <PresetButton onClick={() => handleReultButtonClick('입시결과')}>입시결과</PresetButton>
      <PresetButton onClick={() => handleButtonClick('실기고사')}>실기고사</PresetButton>
      <PresetButton onClick={() => window.location.reload()}>조건 재설정</PresetButton>
    </div>
  );
};
