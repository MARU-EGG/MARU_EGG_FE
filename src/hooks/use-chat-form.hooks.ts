// src/hooks/useChatForm.ts
import { useState, useCallback } from 'react';
import { useAutoComplete } from './use-auto-complete.hooks';
import useChatStore from '../store/chat-store';
import { postQuestion } from '../api/post-question';
import { SearchById } from '../api/admin/admin-search-by-id';
import useTypeStore from '../store/type-category-store';

const useChatForm = () => {
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
        useChatStore.getState().addMessage({ content, role: 'user' });
        useChatStore.getState().addMessage({ content: 'loading', role: 'system' });
        useChatStore.getState().setLoading(true);
        setContent('');
        setAutoOpen(false);
        setDisabled(true);
        if (selectedId === undefined) {
          const response = await postQuestion(category, type, content);
          useChatStore.getState().updateLastMessage(response.answer.content);
          useChatStore.getState().setLoading(false);
          setDisabled(false);
        } else {
          const response = await SearchById(selectedId);
          useChatStore.getState().updateLastMessage(response.answer.content);
          useChatStore.getState().setLoading(false);
          setSelectedId(undefined);
          setDisabled(false);
        }
      } catch (error) {
        useChatStore.getState().setLoading(false);
        useChatStore.getState().updateLastMessage('답변 생성에 실패했습니다. 새로고침해주세요');
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
