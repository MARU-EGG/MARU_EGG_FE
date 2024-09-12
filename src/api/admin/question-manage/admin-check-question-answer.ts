import { server_axiosInstance } from '../../../utils/axios';
import { getCookie } from '../../../utils/cookies';

interface AdminCheckQuestionAnswerProps {
  questionId: number;
}
export async function AdminCheckQuestionAnswer({ questionId }: AdminCheckQuestionAnswerProps) {
  const data = {
    questionId,
  };
  try {
    const response = await server_axiosInstance.put('/api/admin/questions/check', JSON.stringify(data), {
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
