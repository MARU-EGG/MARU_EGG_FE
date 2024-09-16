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
  inputQuestionData: (data: QuestionAnswerState) => void;
  updateCheck: (id: number, isChecked: boolean) => void;
  updateAnswer: (answerId: number, answerContent: string) => void;
  deleteQuestion: (id: number) => void;
  findQuestion: (id: number) => QuestionAnswerState | undefined;
}

const useCheckQuestionAnswerStore = create<CheckQuestionAnswerState>((set, get) => ({
  questionData: [],
  updateQuestionData: (firstData) => set({ questionData: firstData }),
  inputQuestionData: (data) => set((state) => ({ questionData: [...state.questionData, data] })),
  updateCheck: (id, isChecked) =>
    set((state) => ({
      questionData: state.questionData.map((question) => (question.id === id ? { ...question, isChecked } : question)),
    })),
  updateAnswer: (answerId, answerContent) =>
    set((state) => ({
      questionData: state.questionData.map((question) =>
        question.answer.id === answerId
          ? { ...question, answer: { ...question.answer, content: answerContent } }
          : question,
      ),
    })),
  deleteQuestion: (id) =>
    set((state) => ({
      questionData: state.questionData.filter((question) => question.id !== id),
    })),
  findQuestion: (id) => get().questionData.find((question) => question.id === id),
}));

export default useCheckQuestionAnswerStore;
