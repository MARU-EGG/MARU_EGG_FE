import { create } from 'zustand';
export interface DetailTypeItem {
  middleName: string;
  lastNames: string[];
}

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
  selectedName: string;
  setSelectedName: (name: string) => void;
  setLoading: (load: boolean) => void;
  itemsArray: DetailTypeItem[];
  setItemArray: (dataArray: DetailTypeItem[]) => void;
}

export const useUserDetailTypeStore = create<UserDetailTypeStoreState>((set) => ({
  detailTypeData: [],
  loading: false,
  itemsArray: [],
  selectedName: '',
  setSelectedName: (name) => set({ selectedName: name }),
  updateDetailTypeData: (data) => set({ detailTypeData: data }),
  setLoading: (load) => set({ loading: load }),
  setItemArray: (data) => set({ itemsArray: data }),
}));
