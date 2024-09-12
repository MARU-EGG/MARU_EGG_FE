import { server_axiosInstance } from '../../../utils/axios';
import { getCookie } from '../../../utils/cookies';

export async function AdminEditAnswer(id: number, content: string): Promise<any> {
  const data = {
    id,
    content,
  };

  try {
    const response = await server_axiosInstance.put('/api/admin/answers', JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error('Post Failed');
  }
}
