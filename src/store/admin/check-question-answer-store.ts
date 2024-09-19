import { create } from 'zustand';

export interface QuestionAnswerState {
  id: number;
  content: string;
  viewCount: string;
  isChecked: boolean;
  answer: {
    id: number;
    content: string;
  };
}

interface CheckQuestionAnswerState {
  questionData: QuestionAnswerState[];
  updateQuestionData: (firstData: QuestionAnswerState[]) => void;
  updateQuestion: (id: number, content: string) => void;
  updateIsChecked: (id: number) => void;
  updateAnswer: (answerId: number, answerContent: string) => void;
  deleteQuestion: (id: number) => void; // 삭제 함수 추가
  findQuestion: (id: number) => QuestionAnswerState | undefined;
}

const useCheckQuestionAnswerStore = create<CheckQuestionAnswerState>((set, get) => ({
  questionData: [],

  updateQuestionData: (firstData) => set({ questionData: firstData }),

  updateQuestion: (id, content) =>
    set((state) => ({
      questionData: state.questionData.map((question) =>
        question.id === id ? { ...question, content, isChecked: true } : question,
      ),
    })),

  updateIsChecked: (id) =>
    set((state) => ({
      questionData: state.questionData.map((question) =>
        question.id === id ? { ...question, isChecked: !question.isChecked } : question,
      ),
    })),

  updateAnswer: (answerId, answerContent) =>
    set((state) => ({
      questionData: state.questionData.map((question) =>
        question.answer.id === answerId
          ? { ...question, answer: { ...question.answer, content: answerContent }, isChecked: true }
          : question,
      ),
    })),

  deleteQuestion: (id) =>
    set((state) => ({
      questionData: state.questionData.filter((question) => question.id !== id), // 삭제 로직
    })),

  findQuestion: (id) => get().questionData.find((question) => question.id === id),
}));

export default useCheckQuestionAnswerStore;
