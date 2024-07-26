import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../../../utils/style';

interface ChatCardProps {
  content: string;
  role: 'user' | 'system';
}

const ChatCard = ({ content, role }: ChatCardProps) => {
  return (
    <div
      className={cn('flex h-auto flex-col-reverse', {
        'items-end justify-end': role === 'user',
        'items-start justify-start': role !== 'user',
      })}
    >
      <div
        className={cn('flex w-auto max-w-72 rounded-md bg-white px-5 py-3 text-black', {
          'justify-end bg-primary-blue text-white': role === 'user',
          'justify-start text-left': role !== 'user',
        })}
      >
        <div className="px-4 py-3 text-body1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
