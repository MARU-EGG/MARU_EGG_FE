import { create } from 'zustand';

export interface AdmissionDetailTypeState {
  type: 'SUSI' | 'PYEONIP' | 'JEONGSI';
  detailTypeId: number;
  detailTypeName: string;
}

interface AdmissionDetailTypeStoreState {
  detailTypeData: AdmissionDetailTypeState[];
  updateDetailTypeData: (data: AdmissionDetailTypeState[]) => void;
  deleteDetailType: (detailTypeId: number) => void;
}

const useAdmissionDetailTypeStore = create<AdmissionDetailTypeStoreState>((set) => ({
  detailTypeData: [],
  updateDetailTypeData: (data) => set({ detailTypeData: data }),
  deleteDetailType: (id) =>
    set((state) => ({
      detailTypeData: state.detailTypeData.filter((data) => data.detailTypeId !== id),
    })),
}));

export default useAdmissionDetailTypeStore;
