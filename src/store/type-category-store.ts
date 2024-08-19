import { create } from 'zustand';

interface TypeCategoryState {
  type: null | 'SUSI' | 'PYEONIP' | 'JEONGSI';
  category: null | 'ADMISSION_GUIDELINE' | 'PASSING_RESULT' | 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST';
  setSelectedType: (button: TypeCategoryState['type']) => void;
  setSelectedCategory: (button: TypeCategoryState['category']) => void;
}

const useTypeStore = create<TypeCategoryState>()((set) => ({
  type: null,
  category: null,
  setSelectedType: (button) => set({ type: button }),
  setSelectedCategory: (button) => set({ category: button }),
}));

export default useTypeStore;
