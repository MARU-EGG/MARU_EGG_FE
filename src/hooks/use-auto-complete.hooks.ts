import { useEffect, useState } from 'react';
import useDebouce from './use-debounce.hooks';
import { searchAutoComplete } from '../api/search-auto-complete';
import useTypeStore from '../store/type-category-store';

interface UseAutoCompleteProps {
  content: string;
  delay?: number;
}

export interface AutoCompleteResult {
  content: string;
  id: number;
}

export const useAutoComplete = ({ content, delay = 1000 }: UseAutoCompleteProps) => {
  const [results, setResults] = useState<AutoCompleteResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { type, category } = useTypeStore();

  const debouncedContent = useDebouce(content, delay);

  useEffect(() => {
    const fetchResult = async () => {
      if (!debouncedContent) return;
      setError(null);

      try {
        const response = await searchAutoComplete(debouncedContent, type, category);
        setResults(response.data);
      } catch (err) {
        setError('자동완성 api 호출 실패');
      }
    };

    fetchResult();
  }, [debouncedContent]);

  return { results, error };
};
