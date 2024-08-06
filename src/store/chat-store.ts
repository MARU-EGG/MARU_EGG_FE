import { create } from 'zustand';

interface ChatState {
  messages: { content: string; role: 'user' | 'system' }[];
  loading: boolean;
  addMessage: (message: { content: string; role: 'user' | 'system' }) => void;
  setLoading: (loading: boolean) => void;
  updateLastMessage: (content: string) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  loading: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ loading }),
  updateLastMessage: (content) =>
    set((state) => {
      const updatedMessages = [...state.messages];
      updatedMessages[updatedMessages.length - 1].content = content;
      return { messages: updatedMessages };
    }),
}));
export default useChatStore;
