import React, { useState } from 'react';
import TextInput from '../../../atom/text-input/text-input';
import IconButton from '../../../atom/icon/icon-button';
import { ReactComponent as SendIcon } from '../../../../../assets/Send.svg';
import { postQuestion } from '../../../../../api/post-question';
import { cn } from '../../../../../utils/style';

interface ChatFormProps {
  type: string;
  category: string;
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
      const response = await postQuestion(category, type, content);
      console.log('전송 성공:', response);
      setContent('');
      setDisabled(true);
    } catch (error) {
      console.error('전송 실패:', error);
    }
  };

  return (
    <form
      className={cn('flex w-96 flex-nowrap rounded-2xl px-4 py-2', 'bg-background-default')}
      onSubmit={handleSubmit}
    >
      <TextInput value={content} onValueChange={handleChange} placeholder="메시지를 입력해주세요." />
      <IconButton type="submit" disabled={disabled}>
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default ChatForm;
