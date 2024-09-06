import { create } from 'zustand';

interface referenceState {
  title: string;
  link: string;
}
interface ChatState {
  messages: { content: string; role: 'user' | 'system' }[]; //사용자와 시스템 메시지가 저장되는 배열
  loading: boolean; //답변이 오는 기간동안 로딩상태 파악 위한 것으로, 스피너에 적용
  lastReference: referenceState[];
  addMessage: (message: { content: string; role: 'user' | 'system' }) => void; //새로운 메시지가 들어올때 사용
  setLoading: (loading: boolean) => void;
  updateLastMessage: (content: string) => void; //유저가 새로운 질문을 할 때 화면에 보여지기 위해 사용되는 함수
  updateLastReference: (reference: referenceState[]) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  loading: false,
  lastReference: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ loading }),
  updateLastMessage: (content) =>
    set((state) => {
      const updatedMessages = [...state.messages];
      updatedMessages[updatedMessages.length - 1].content = content;
      return { messages: updatedMessages };
    }),
  updateLastReference: (reference) => set({ lastReference: reference }),
}));
export default useChatStore;
