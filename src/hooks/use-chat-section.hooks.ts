import React from 'react';
import useTypeStore, { TypeCategoryState } from '../store/type-category-store';

const useChatSection = () => {
  const { setSelectedType, setSelectedCategory } = useTypeStore();
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

  return {
    selectedTypeButton,
    selectedCategoryButton,
    handleTypeButtonClick,
    handleCategoryButtonClick,
  };
};

export default useChatSection;
