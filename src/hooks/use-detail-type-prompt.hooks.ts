import { useEffect, useState } from 'react';
import { TypeStatusProps } from '../api/admin/question-type-status/change-type-status';
import { getDetailType } from '../api/get-admission-detail-type.query';
import { useUserDetailTypeStore } from '../store/user-detail-type-store';

export const useDetailTypePrompt = ({ type }: TypeStatusProps) => {
  const [middleNameArray, setMiddleNameArray] = useState<string[]>([]);
  const [lastNameArray, setLastNameArray] = useState<string[]>([]);
  const { detailTypeData, updateDetailTypeData } = useUserDetailTypeStore();

  useEffect(() => {
    const fetchDetailType = async () => {
      try {
        const response = await getDetailType({ type });
        updateDetailTypeData(response);
      } catch (error) {
        console.error('Fetching Failed');
      }
    };

    fetchDetailType();
  }, [type, updateDetailTypeData]);

  useEffect(() => {
    if (detailTypeData.length > 0) {
      const middleNameSet = new Set<string>();
      const lastNameArrayTemp: string[] = [];

      detailTypeData.forEach((item) => {
        const parts = item.name.split('(');
        const middle = parts[0];
        middleNameSet.add(middle);

        const last = parts.slice(1).join('(').replace(/\)$/, '');
        lastNameArrayTemp.push(last);
      });

      setMiddleNameArray(Array.from(middleNameSet));
      setLastNameArray(lastNameArrayTemp);
    }
  }, [detailTypeData]);

  return {
    middleNameArray,
    lastNameArray,
  };
};
