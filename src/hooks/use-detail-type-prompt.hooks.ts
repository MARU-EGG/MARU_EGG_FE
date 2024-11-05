import { useUserDetailTypeStore } from '../store/user-detail-type-store';

interface DetailTypeItem {
  middleName: string;
  lastNames: string[];
}

export const useDetailTypePrompt = () => {
  const { detailTypeData } = useUserDetailTypeStore();

  const itemMap = new Map<string, Set<string>>();

  detailTypeData.forEach((item) => {
    const [middle, lastWithBracket] = item.name.split('(');
    const middleTrimmed = middle.trim();
    const lastTrimmed = lastWithBracket ? lastWithBracket.replace(/\)$/, '').trim() : '';

    if (!itemMap.has(middleTrimmed)) {
      itemMap.set(middleTrimmed, new Set<string>());
    }

    if (lastTrimmed) {
      itemMap.get(middleTrimmed)?.add(lastTrimmed);
    }
  });

  const itemList: DetailTypeItem[] = Array.from(itemMap.entries()).map(([middleName, lastNamesSet]) => ({
    middleName,
    lastNames: Array.from(lastNamesSet),
  }));

  return {
    itemList,
  };
};
