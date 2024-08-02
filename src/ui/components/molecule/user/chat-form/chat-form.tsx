import React, { useState } from 'react';
import TextInput from '../../../atom/text-input/text-input';
import IconButton from '../../../atom/icon/icon-button';
import { ReactComponent as SendIcon } from '../../../../../assets/Send.svg';
import { postQuestion } from '../../../../../api/post-question';
import { cn } from '../../../../../utils/style';
import useChatStore from '../../../../../store/chat-store';

interface ChatFormProps {
  type: 'SUSI' | 'PYEONIP' | 'JEONGSI';
  category?: 'PAST_QUESTIONS' | 'INTERVIEW_PRACTICAL_TEST' | 'PASSING_RESULT' | 'ADMISSION_GUIDELINE';
}

const ChatForm = ({ type, category }: ChatFormProps) => {
  const [content, setContent] = useState<string>('');
  const [disabled, setDisabled] = useState(true);

  const handleChange = (value: string) => {
    setContent(value);
    setDisabled(value.trim() === '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      useChatStore.getState().addMessage({ content, role: 'user' });
      const response = await postQuestion(category, type, content);
      console.log('전송 성공:', response);
      useChatStore.getState().addMessage({ content: response.answer.content, role: 'system' });
      setContent('');
      setDisabled(true);
    } catch (error) {
      console.error('전송 실패:', error);
    }
  };

  return (
    <form className={cn('flex flex-nowrap rounded-2xl px-4 py-2', 'bg-background-default')} onSubmit={handleSubmit}>
      <TextInput value={content} onValueChange={handleChange} placeholder="메시지를 입력해주세요." />
      <IconButton type="submit" disabled={disabled}>
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default ChatForm;
