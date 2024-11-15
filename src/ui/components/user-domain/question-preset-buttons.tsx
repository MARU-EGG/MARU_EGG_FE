import * as React from 'react';
import useChatStore from '../../../store/chat-store';
import PresetButton from '../atom/preset/preset-button';
import usePresetButton from '../../../hooks/use-preset-button.hooks';
import { useUserDetailTypeStore } from '../../../store/user-detail-type-store';
import useTypeStore from '../../../store/type-category-store';

export const QuestionPresetButtons = () => {
  const { lastReference, referenceButtonDisabled } = useChatStore();
  const { handleReferenceButtonClick, handleButtonClick } = usePresetButton();
  const { type } = useTypeStore();
  const { selectedName } = useUserDetailTypeStore(); // 선택된 세부 전형 가져오기

  const handleResultButtonClick = (content: string) => {
    if (type && selectedName) {
      console.log(type, selectedName);
      handleButtonClick(content, 'PASSING_RESULT');
    }
  };
  // const handleResultButtonClick = (content: string) => {
  //   let typeLabel = '';
  //   if (type) {
  //     switch (type) {
  //       case 'SUSI':
  //         typeLabel = '수시전형';
  //         break;
  //       case 'JEONGSI':
  //         typeLabel = '정시전형';
  //         break;
  //       case 'PYEONIP':
  //         typeLabel = '편입전형';
  //         break;
  //       default:
  //         typeLabel = type; // 기본적으로 원래 타입을 사용
  //     }
  //   }

  //   if (typeLabel && selectedName) {
  //     // 실제 전달값은 전체 정보를 포함
  //     const fullContent = `${typeLabel}의 ${selectedName}의 ${content}를 알려줘`;
  //     handleButtonClick('입시결과', 'PAS');
  //   } else {
  //     // 학과 선택 요청 메시지
  //     handleButtonClick('원하시는 학과를 선택해 주세요.', 'DEPARTMENT_SELECTION');
  //   }
  // };

  return (
    <div className="grid w-full grid-cols-1 gap-2 mobile:w-2/3 mobile:grid-cols-1 desktop:grid desktop:w-full desktop:grid-cols-2 desktop:gap-2">
      {!referenceButtonDisabled && (
        <PresetButton onClick={() => handleReferenceButtonClick(lastReference)}>👆 출처를 알고싶어요</PresetButton>
      )}
      <PresetButton onClick={() => handleButtonClick('전형일정')}>전형일정</PresetButton>
      <PresetButton onClick={() => handleButtonClick('블라인드 면접 유의사항')}>면접유의사항</PresetButton>
      <PresetButton onClick={() => handleButtonClick('제출서류 유의사항')}>제출서류</PresetButton>
      <PresetButton onClick={() => handleResultButtonClick('입시결과')}>입시결과</PresetButton>
      <PresetButton onClick={() => handleButtonClick('실기고사')}>실기고사</PresetButton>
      <PresetButton onClick={() => window.location.reload()}>조건 재설정</PresetButton>
    </div>
  );
};
