import { create } from 'zustand';

interface TypeState {
  type: null | 'SUSI' | 'PYEONIP' | 'JEONGSI';
  setSelectedType: (button: TypeState['type']) => void; // button 타입을 TypeState['type']로 정의
}

const useTypeStore = create<TypeState>()((set) => ({
  type: null,
  setSelectedType: (button) => set({ type: button }), // setSelectedType 정의
}));

export default useTypeStore;
