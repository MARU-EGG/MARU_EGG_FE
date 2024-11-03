import { create } from 'zustand';

export interface AdmissionDetailTypeState {
  type?: 'SUSI' | 'PYEONIP' | 'JEONGSI';
  id?: number;
  name?: string;
}

interface AdmissionDetailTypeStoreState {
  detailTypeData: AdmissionDetailTypeState[];
  updateDetailTypeData: (data: AdmissionDetailTypeState[]) => void;
  deleteDetailType: (detailTypeId: number) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
}

const useAdmissionDetailTypeStore = create<AdmissionDetailTypeStoreState>((set) => ({
  detailTypeData: [],
  updateDetailTypeData: (data) => set({ detailTypeData: data }),
  deleteDetailType: (id) =>
    set((state) => ({
      detailTypeData: state.detailTypeData.filter((data) => data.id !== id),
    })),
  loading: false,
  setLoading: (load) => set({ loading: load }),
}));

export default useAdmissionDetailTypeStore;
