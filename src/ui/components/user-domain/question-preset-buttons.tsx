import * as React from 'react';
import useChatStore from '../../../store/chat-store';
import PresetButton from '../atom/preset/preset-button';
import usePresetButton from '../../../hooks/use-preset-button.hooks';

export const QuestionPresetButtons = () => {
  const { lastReference, referenceButtonDisabled } = useChatStore();
  const { handleReferenceButtonClick, handleButtonClick } = usePresetButton();

  return (
    <div>
      {!referenceButtonDisabled && (
        <PresetButton onClick={() => handleReferenceButtonClick(lastReference)}>👆 출처를 알고싶어요</PresetButton>
      )}
      <PresetButton onClick={() => handleButtonClick('전형일정')}>전형일정</PresetButton>
      <PresetButton onClick={() => handleButtonClick('면접 유의사항')}>면접유의사항</PresetButton>
      <PresetButton onClick={() => handleButtonClick('제출서류 유의사항')}>제출서류</PresetButton>
      <PresetButton onClick={() => handleButtonClick('입시결과안내')}>입시결과</PresetButton>
      <PresetButton onClick={() => handleButtonClick('실기고사')}>실기고사</PresetButton>
      <PresetButton onClick={() => window.location.reload()}>내용 변경하기</PresetButton>
    </div>
  );
};
