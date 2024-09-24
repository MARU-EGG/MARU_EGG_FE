import * as React from 'react';
import PresetButton from '../atom/preset/preset-button';
import useChatSection from '../../../hooks/use-chat-section.hooks';
import { useTypeDisabledStore } from '../../../store/type-disabled-store';
import useChatStore from '../../../store/chat-store';

export const TypePresetButtons = () => {
  const { selectedTypeButton, handleTypeButtonClick } = useChatSection();
  const { activeSusi, activeJeongsi, activePyeonip } = useTypeDisabledStore();
  const { referenceButtonDisabled } = useChatStore();
  return (
    <div className="flex space-x-2">
      <PresetButton
        disabled={activeSusi || !referenceButtonDisabled}
        onClick={() => handleTypeButtonClick('SUSI')}
        isSelected={selectedTypeButton === 'SUSI'}
      >
        수시
      </PresetButton>
      <PresetButton
        disabled={activeJeongsi || !referenceButtonDisabled}
        onClick={() => handleTypeButtonClick('JEONGSI')}
        isSelected={selectedTypeButton === 'JEONGSI'}
      >
        정시
      </PresetButton>
      <PresetButton
        disabled={activePyeonip || !referenceButtonDisabled}
        onClick={() => handleTypeButtonClick('PYEONIP')}
        isSelected={selectedTypeButton === 'PYEONIP'}
      >
        편입
      </PresetButton>
    </div>
  );
};
