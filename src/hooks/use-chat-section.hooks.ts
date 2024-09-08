import React from 'react';
import useTypeStore, { TypeCategoryState } from '../store/type-category-store';
import useChatStore, { referenceState } from '../store/chat-store';

const useChatSection = () => {
  const { setSelectedType, setSelectedCategory } = useTypeStore();
  const { addMessage, updateReferenceDisabled } = useChatStore();
  const [selectedTypeButton, setSelectedTypeButton] = React.useState<TypeCategoryState['type']>(undefined);
  const [selectedCategoryButton, setSelectedCategoryButton] = React.useState<TypeCategoryState['category']>(undefined);

  const handleTypeButtonClick = (selectedType: TypeCategoryState['type']) => {
    setSelectedType(selectedType);
    setSelectedTypeButton(selectedType);
  };

  const handleCategoryButtonClick = (selectedCategory: TypeCategoryState['category']) => {
    setSelectedCategory(selectedCategory);
    setSelectedCategoryButton(selectedCategory);
  };

  const handleReferenceButtonClick = (references: referenceState[]) => {
    console.log(references);
    let content = '답변 출처를 알려드릴게요!\n';
    if (references === undefined || references.length === 0) {
      addMessage({ content: '출처 정보가 없습니다.', role: 'system' });
      return;
    }
    references.map((reference, index) => {
      content += `\n출처${index + 1}번: ${reference.link}\n`;
    });
    content += '\n**답변을 꼭 확인해주세요!**';
    addMessage({ content: content, role: 'system' });
    updateReferenceDisabled(true);
  };

  return {
    selectedTypeButton,
    selectedCategoryButton,
    handleTypeButtonClick,
    handleCategoryButtonClick,
    handleReferenceButtonClick,
  };
};

export default useChatSection;
