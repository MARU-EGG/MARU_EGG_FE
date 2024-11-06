import React from 'react';
import IconButton from '../../atom/icon/icon-button';
import { ReactComponent as SendIcon } from '../../../../assets/Send.svg';
import AutoCompleteList from '../../atom/auto-complete/auto-complete';
import { cn } from '../../../../utils/style';
import useChatForm from '../../../../hooks/use-chat-form.hooks';
import { useTextAreaSubmit } from '../../../../hooks/use-textarea-submit.hooks';

const ChatForm = () => {
  const { content, autoOpen, disabled, results, handleChange, handleSelect, handleSubmit } = useChatForm();
  const { handlePressEnter } = useTextAreaSubmit({ handleSubmit });
  return (
    <>
      {autoOpen && <AutoCompleteList results={results} onSelect={handleSelect} />}
      <form
        className={cn('flex flex-nowrap rounded-2xl border py-2 pr-1', 'bg-background-default')}
        onSubmit={handleSubmit}
      >
        <textarea
          rows={2}
          className={cn(
            `w-full resize-none rounded-2xl bg-transparent px-4 py-2 text-base`,
            `placeholder:text-[#72777A] focus:outline-none`,
            `disabled:cursor-wait`,
          )}
          disabled={disabled}
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handlePressEnter}
          placeholder="질문을 입력해주세요"
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
