import { create } from 'zustand';

//TSK-53 admission-detail-type-store.ts와 일부 겹침 나중에 병합 필요성
export interface UserDetailTypeState {
  type: 'SUSI' | 'JEONGSI' | 'PYEONIP';
  id: number;
  name: string;
}

interface UserDetailTypeStoreState {
  detailTypeData: UserDetailTypeState[];
  updateDetailTypeData: (data: UserDetailTypeState[]) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
}

export const useUserDetailTypeStore = create<UserDetailTypeStoreState>((set) => ({
  detailTypeData: [],
  loading: false,
  updateDetailTypeData: (data) => set({ detailTypeData: data }),
  setLoading: (load) => set({ loading: load }),
}));
