import { create } from 'zustand';

export interface TypeCategoryState {
  type: undefined | 'SUSI' | 'PYEONIP' | 'JEONGSI';
  category: 'ADMISSION_GUIDELINE' | 'PASSING_RESULT' | 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST';
  setSelectedType: (button: TypeCategoryState['type']) => void;
  setSelectedCategory: (button: TypeCategoryState['category']) => void;
  setContentCategory: (
    category: 'ADMISSION_GUIDELINE' | 'PASSING_RESULT' | 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST',
  ) => void;
}

const useTypeStore = create<TypeCategoryState>()((set) => ({
  type: undefined,
  category: 'ADMISSION_GUIDELINE',
  setSelectedType: (button) => set({ type: button }),
  setSelectedCategory: (button) => set({ category: button }),
  setContentCategory: (category) => set({ category: category }),
}));

export default useTypeStore;
