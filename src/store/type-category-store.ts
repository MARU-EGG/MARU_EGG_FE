import { create } from 'zustand';

export interface TypeCategoryState {
  type: undefined | 'SUSI' | 'PYEONIP' | 'JEONGSI';
  category: undefined | 'ADMISSION_GUIDELINE' | 'PASSING_RESULT' | 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST';
  setSelectedType: (button: TypeCategoryState['type']) => void;
  setSelectedCategory: (button: TypeCategoryState['category']) => void;
}

const useTypeStore = create<TypeCategoryState>()((set) => ({
  type: undefined,
  category: undefined,
  setSelectedType: (button) => set({ type: button }),
  setSelectedCategory: (button) => set({ category: button }),
}));

export default useTypeStore;
