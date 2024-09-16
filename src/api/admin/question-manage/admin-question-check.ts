import { server_axiosInstance } from '../../../utils/axios';

interface AdminQuestionCheckProps {
  type: string;
  category?: string;
}

export async function adminQuestionCheck({ type, category }: AdminQuestionCheckProps) {
  try {
    const response = await server_axiosInstance.get('/api/questions', {
      params: {
        type,
        category,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Upload failed: ${error.message}`);
  }
}
