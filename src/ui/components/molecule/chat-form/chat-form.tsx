// src/ui/molecule/chat-form.tsx
import React from 'react';
import TextInput from '../../atom/text-input/text-input';
import IconButton from '../../atom/icon/icon-button';
import { ReactComponent as SendIcon } from '../../../../assets/Send.svg';
import AutoCompleteList from '../../atom/auto-complete/auto-complete';
import { cn } from '../../../../utils/style';
import useChatForm from '../../../../hooks/use-chat-form.hooks';

const ChatForm = () => {
  const { content, autoOpen, disabled, results, handleChange, handleSelect, handleSubmit } = useChatForm();

  return (
    <>
      {autoOpen && <AutoCompleteList results={results} onSelect={handleSelect} />}
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
