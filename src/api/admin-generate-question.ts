import { server_axiosInstance } from '../utils/axios';

interface AdminGenerateQuestionProps {
  category: string;
  type: string;
  questionContent: string;
  answerContent: string;
}

export async function AdminGenerateQuestion({
  category,
  type,
  questionContent,
  answerContent,
}: AdminGenerateQuestionProps) {
  const year = new Date().getFullYear();
  const data = {
    content: questionContent,
    questionType: type,
    questionCategory: category,
    answer: {
      content: answerContent,
      renewalYear: year,
    },
  };
  try {
    const response = await server_axiosInstance.post('/api/questions/new', JSON.stringify(data));
    return response.data;
  } catch (error: any) {
    throw new Error('created failed');
  }
}
