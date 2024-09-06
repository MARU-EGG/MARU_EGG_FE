import * as React from 'react';
import useChatStore from '../../../store/chat-store';
import PresetButton from '../atom/preset/preset-button';
import useChatSection from '../../../hooks/use-chat-section.hooks';

export const QuestionPresetButtons = () => {
  const { lastReference } = useChatStore();
  const { handleReferenceButtonClick } = useChatSection();

  return (
    <div>
      <PresetButton onClick={() => handleReferenceButtonClick(lastReference)}>답변출처확인</PresetButton>
    </div>
  );
};
