import { server_axiosInstance } from '../utils/axios';
import { getCookie } from '../utils/cookies';

interface AdminCheckQuestionAnswerProps {
  questionId: number;
  check: boolean;
}
export async function AdminCheckQuestionAnswer({ questionId, check }: AdminCheckQuestionAnswerProps) {
  const data = {
    questionId,
    check,
  };
  try {
    const response = await server_axiosInstance.post('/api/admin/questions/check', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('checked failed');
  }
}
