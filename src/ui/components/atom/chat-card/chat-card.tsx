import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../../../utils/style';
import maru from '../../../../assets/maru-egg.png';
interface ChatCardProps {
  content: string;
  role: 'user' | 'system';
}
const ChatCard = ({ content, role }: ChatCardProps) => {
  return (
    <div>
      {role === 'user' ? null : <img src={maru} className="mb-2 h-8 w-8" />}
      <div
        className={cn('flex h-auto flex-col-reverse py-3', {
          'items-end justify-end': role === 'user',
          'items-start justify-start': role !== 'user',
        })}
      >
        <div
          className={cn('flex w-auto rounded-md bg-white px-5 py-3 text-black', {
            'justify-end bg-primary-blue text-white': role === 'user',
            'justify-start text-left': role !== 'user',
          })}
        >
          <div className="px-4 py-3 text-body1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
