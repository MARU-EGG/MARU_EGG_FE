import * as React from 'react';
import PresetButton from '../atom/preset/preset-button';
import useChatSection from '../../../hooks/use-chat-section.hooks';

export const CategoryPresetButtons = () => {
  const { selectedCategoryButton, handleCategoryButtonClick } = useChatSection();
  return (
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
  );
};
