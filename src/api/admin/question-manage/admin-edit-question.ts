import { server_axiosInstance } from '../../../utils/axios';
import { getCookie } from '../../../utils/cookies';

export async function adminEditQuestion(id: number, content: string) {
  const data = {
    id,
    content,
  };

  try {
    const response = await server_axiosInstance.put('/api/admin/questions', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Edit Failed');
  }
}
