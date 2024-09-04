import { server_axiosInstance } from '../../../utils/axios';
import { getCookie } from '../../../utils/cookies';

interface ChangeTypeStatusProps {
  type: 'SUSI' | 'JEONGSI' | 'PYEONIP';
}

export async function chnageTypeStatus({ type }: ChangeTypeStatusProps) {
  try {
    const response = await server_axiosInstance.put('/api/admin/questions/status', JSON.stringify({ type: type }), {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Put Failed');
  }
}
