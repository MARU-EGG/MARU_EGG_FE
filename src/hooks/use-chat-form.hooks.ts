// src/hooks/useChatForm.ts
import { useState, useCallback } from 'react';
import { useAutoComplete } from './use-auto-complete.hooks';
import useChatStore from '../store/chat-store';
import { postQuestion } from '../api/post-question';
import { SearchById } from '../api/admin/question-manage/admin-search-by-id';
import useTypeStore from '../store/type-category-store';

const useChatForm = () => {
  const { addMessage, setLoading, updateLastMessage, updateLastReference, updateReferenceDisabled } = useChatStore();
  const [content, setContent] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const { results } = useAutoComplete({ content });
  const { type, category } = useTypeStore();

  const handleChange = useCallback((value: string) => {
    setContent(value);
    setAutoOpen(true);
    setSelectedId(undefined);
  }, []);

  const handleSelect = useCallback((value: string, id: number) => {
    setSelectedId(id);
    setContent(value);
    setDisabled(value.trim() === '');
    setAutoOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        addMessage({ content, role: 'user' });
        addMessage({ content: 'loading', role: 'system' });
        setLoading(true);
        setContent('');
        setAutoOpen(false);
        setDisabled(true);
        if (selectedId === undefined) {
          const response = await postQuestion(category, type, content);
          updateLastMessage(response.answer.content);
          updateLastReference(response.references);
          updateReferenceDisabled(false);
          setLoading(false);
          setDisabled(false);
        } else {
          const response = await SearchById(selectedId);
          updateLastMessage(response.answer.content);
          updateLastReference(response.references);
          updateReferenceDisabled(false);
          setLoading(false);
          setSelectedId(undefined);
          setDisabled(false);
        }
      } catch (error) {
        setLoading(false);
        updateLastMessage('답변 생성에 실패했습니다. 새로고침해주세요');
      }
    },
    [content, selectedId, category, type],
  );

  return {
    content,
    autoOpen,
    disabled,
    results,
    handleChange,
    handleSelect,
    handleSubmit,
  };
};

export default useChatForm;
