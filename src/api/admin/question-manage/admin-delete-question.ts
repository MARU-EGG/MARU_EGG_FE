import { server_axiosInstance } from '../../../utils/axios';
import { getCookie } from '../../../utils/cookies';

export async function adminDeleteQuestion(questionId: number) {
  try {
    const response = await server_axiosInstance.delete(`/api/admin/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
        'Content-Type': 'application-json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}
