// src/ui/pages/maru-egg.tsx
import React from 'react';
import Header from '../components/molecule/header/header';
import useTypeStore from '../../store/type-category-store';
import ChatCard from '../components/atom/chat-card/chat-card';
import ChatForm from '../components/molecule/chat-form/chat-form';
import useChatStore from '../../store/chat-store';
import PresetButton from '../components/atom/preset/preset-button';
import ChatSection from '../components/molecule/chat-section/chat-section';

const MaruEgg: React.FC = () => {
  const { type, category } = useTypeStore();

  return (
    <div className="flex h-svh items-center justify-center bg-gray-100">
      <div className="relative flex h-[780px] w-[390px] rounded-2xl border border-gray-200 bg-background-default shadow-2xl">
        <Header type={type} />
        <ChatSection />
        {type !== undefined && category !== undefined && (
          <div className="absolute bottom-0 w-full rounded-bl-2xl rounded-br-2xl bg-white px-3 py-3">
            <ChatForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaruEgg;
