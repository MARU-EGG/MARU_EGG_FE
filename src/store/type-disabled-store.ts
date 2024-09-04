import { create } from 'zustand';

export interface TypeDisabledState {
  activeSusi: boolean;
  activeJeongsi: boolean;
  activePyeonip: boolean;
  setSusiDisabled: (disabled: boolean) => void;
  setJeongsiDisabled: (disabled: boolean) => void;
  setPyeonipDisabled: (disabled: boolean) => void;
}

export const useTypeDisabledStore = create<TypeDisabledState>()((set) => ({
  activeSusi: true,
  activeJeongsi: true,
  activePyeonip: true,
  setSusiDisabled: (disabled) => set({ activeSusi: disabled }),
  setJeongsiDisabled: (disabled) => set({ activeJeongsi: disabled }),
  setPyeonipDisabled: (disabled) => set({ activePyeonip: disabled }),
}));
