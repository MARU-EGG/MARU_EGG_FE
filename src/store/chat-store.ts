import { create } from 'zustand';

interface ChatState {
  messages: { content: string; role: 'user' | 'system' }[];
  addMessage: (message: { content: string; role: 'user' | 'system' }) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));

export default useChatStore;
