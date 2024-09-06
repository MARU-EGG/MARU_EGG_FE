import * as React from 'react';
import PresetButton from '../atom/preset/preset-button';
import useChatSection from '../../../hooks/use-chat-section.hooks';
import { useTypeDisabledStore } from '../../../store/type-disabled-store';

export const TypePresetButtons = () => {
  const { selectedTypeButton, handleTypeButtonClick } = useChatSection();
  const { activeSusi, activeJeongsi, activePyeonip } = useTypeDisabledStore();
  return (
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
  );
};
