import React, { useState } from 'react';
import TextInput from '../../atom/text-input/text-input';
import IconButton from '../../atom/icon/icon-button';
import { ReactComponent as SendIcon } from '../../../../assets/Send.svg';
import { postQuestion } from '../../../../api/post-question';
import { cn } from '../../../../utils/style';
import useChatStore from '../../../../store/chat-store';
import { useAutoComplete } from '../../../../hooks/use-auto-complete.hooks';
import AutoCompleteList from '../../atom/auto-complete/auto-complete';
import { SearchById } from '../../../../api/admin-search-by-id';

interface ChatFormProps {
  type: 'SUSI' | 'PYEONIP' | 'JEONGSI';
  category?: 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST' | 'PASSING_RESULT' | 'ADMISSION_GUIDELINE';
}

const ChatForm = ({ type, category }: ChatFormProps) => {
  const [content, setContent] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const { results } = useAutoComplete({ content });

  const handleChange = (value: string) => {
    setContent(value);
    setAutoOpen(true);
    setSelectedId(undefined);
  };

  const handleSelect = (value: string, id: number) => {
    setSelectedId(id);
    setContent(value);
    setDisabled(value.trim() === '');
    setAutoOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      useChatStore.getState().addMessage({ content, role: 'user' });
      useChatStore.getState().addMessage({ content: '답변을 생성중입니다...', role: 'system' });
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
  };

  return (
    <>
      {autoOpen ? <AutoCompleteList results={results} onSelect={handleSelect} /> : null}
      <form
        className={cn('flex flex-nowrap rounded-2xl border py-2 pr-1', 'bg-background-default')}
        onSubmit={handleSubmit}
      >
        <TextInput
          value={content}
          onValueChange={handleChange}
          placeholder="메시지를 입력해주세요."
          disabled={disabled}
        />
        <IconButton type="submit" disabled={disabled}>
          <div className="pr-2">
            <SendIcon />
          </div>
        </IconButton>
      </form>
    </>
  );
};

export default ChatForm;
