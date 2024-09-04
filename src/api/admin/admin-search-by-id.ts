import { server_axiosInstance } from '../../utils/axios';

export async function SearchById(id: number) {
  try {
    const response = await server_axiosInstance.get('/api/question', {
      params: {
        questionId: id,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Upload failed: ${error.message}`);
  }
}
