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
  updateQuestionData: (firstData: QuestionAnswerState[]) => void; //처음 데이터를 삽입할 때 사용하는 거
  inputQuestionData: (data: QuestionAnswerState) => void; //커스텀 질문 생성시 사용하는거
  updateCheck: (id: number, isChecked: boolean) => void; //질문-답변 상태 확인할 때 사용
  updateAnswer: (answerId: number, answerContent: string) => void; //답변 내용 변경할 때 사용
}

const useCheckQuestionAnswerStore = create<CheckQuestionAnswerState>((set) => ({
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
}));

export default useCheckQuestionAnswerStore;
