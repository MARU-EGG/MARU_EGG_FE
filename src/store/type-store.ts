import { create } from 'zustand';

interface TypeState {
  type: null | 'SUSI' | 'PYEONIP' | 'JEONGSI';
  setSelectedType: (button: TypeState['type']) => void;
}

const useTypeStore = create<TypeState>()((set) => ({
  type: null,
  setSelectedType: (button) => set({ type: button }),
}));

export default useTypeStore;
